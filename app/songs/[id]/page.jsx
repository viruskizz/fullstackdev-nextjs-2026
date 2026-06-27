import songModel from "@/libs/models/song"
import watchHistoryModel from "@/libs/models/watchHistory"
import { getServerUser } from "@/libs/supabase-server"
import VideoPlayer from "@/components/player/VideoPlayer"
import SongInfo from "@/components/player/SongInfo"
import { notFound } from "next/navigation"

export default async function SongPage({ params }) {
  const { id } = await params
  const { data: song, error } = await songModel.getByIdWithDetails(id)

  if (error || !song) {
    notFound()
  }

  const user = await getServerUser()
  let progress = 0

  if (user) {
    const { data } = await watchHistoryModel.getProgress(user.id, Number(id))
    progress = data ?? 0
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <VideoPlayer
        youtubeUrl={song.youtube_url}
        songId={song.id}
        title={song.title}
        initialProgress={progress}
        isSignedIn={Boolean(user)}
      />
      <SongInfo song={song} progress={progress} />
    </div>
  )
}
