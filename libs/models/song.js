import supabase from "../supabase"

function flattenSong(row) {
  const album = row.albums
  const artist = album?.artists

  return {
    id: row.id,
    title: row.title,
    duration_seconds: row.duration_seconds,
    cover_image: row.cover_image ?? album?.cover_image,
    youtube_url: row.youtube_url,
    album_title: album?.title,
    artist_name: artist?.name,
    artist_image: artist?.image,
    genre: artist?.genre,
  }
}

const songModel = {
  getId: async (id) => {
    return await supabase
      .from("songs")
      .select()
      .eq("id", id)
      .limit(1)
      .single()
  },

  getByIdWithDetails: async (id) => {
    const { data, error } = await supabase
      .from("songs")
      .select(`
        id,
        title,
        duration_seconds,
        cover_image,
        youtube_url,
        albums (
          title,
          cover_image,
          artists (
            name,
            image,
            genre
          )
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      return { data: null, error }
    }

    return { data: flattenSong(data), error: null }
  },

  getDiscoverList: async () => {
    const { data, error } = await supabase
      .from("songs")
      .select(`
        id,
        title,
        duration_seconds,
        cover_image,
        albums (
          title,
          cover_image,
          artists (
            name,
            image,
            genre
          )
        )
      `)
      .order("id")

    if (error) {
      return { data: [], error }
    }

    return { data: data.map(flattenSong), error: null }
  },
}

export default songModel
