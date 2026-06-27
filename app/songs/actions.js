"use server"

import { getServerUser } from "@/libs/supabase-server"
import watchHistoryModel from "@/libs/models/watchHistory"
import songModel from "@/libs/models/song"

export async function saveWatchProgress(songId, progress) {
  const user = await getServerUser()
  if (!user) {
    return { error: null }
  }

  const parsedSongId = Number(songId)
  const parsedProgress = Math.max(0, Math.floor(Number(progress)))

  if (!parsedSongId || Number.isNaN(parsedProgress)) {
    return { error: "Invalid progress data" }
  }

  const { data: song, error: songError } = await songModel.getByIdWithDetails(parsedSongId)
  if (songError || !song) {
    return { error: "Song not found" }
  }

  const cappedProgress = song.duration_seconds
    ? Math.min(parsedProgress, song.duration_seconds)
    : parsedProgress

  const { error } = await watchHistoryModel.upsertProgress(
    user.id,
    parsedSongId,
    cappedProgress
  )

  if (error) {
    return { error: error.message }
  }

  return { error: null }
}
