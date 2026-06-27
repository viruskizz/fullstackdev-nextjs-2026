import { createClient } from "../supabase-server"

function flattenHistoryRow(row) {
  const song = row.songs
  const album = song?.albums
  const artist = album?.artists

  return {
    progress: row.progress,
    watched_at: row.watched_at,
    id: song?.id,
    title: song?.title,
    duration_seconds: song?.duration_seconds,
    cover_image: song?.cover_image ?? album?.cover_image,
    artist_name: artist?.name,
    artist_image: artist?.image,
  }
}

const watchHistoryModel = {
  listForUser: async (userId, limit = 20) => {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("watch_history")
      .select(`
        progress,
        watched_at,
        songs (
          id,
          title,
          duration_seconds,
          cover_image,
          albums (
            title,
            cover_image,
            artists (
              name,
              image
            )
          )
        )
      `)
      .eq("user_id", userId)
      .order("watched_at", { ascending: false })
      .limit(limit)

    if (error) {
      return { data: [], error }
    }

    return {
      data: data.map(flattenHistoryRow).filter((row) => row.id),
      error: null,
    }
  },

  getProgress: async (userId, songId) => {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("watch_history")
      .select("progress")
      .eq("user_id", userId)
      .eq("song_id", songId)
      .maybeSingle()

    if (error) {
      return { data: null, error }
    }

    return { data: data?.progress ?? 0, error: null }
  },

  upsertProgress: async (userId, songId, progressSeconds) => {
    const supabase = await createClient()

    return await supabase
      .from("watch_history")
      .upsert(
        {
          user_id: userId,
          song_id: songId,
          progress: progressSeconds,
          watched_at: new Date().toISOString(),
        },
        { onConflict: "user_id,song_id" }
      )
  },
}

export default watchHistoryModel
