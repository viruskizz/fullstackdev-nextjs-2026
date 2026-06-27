import songModel from "@/libs/models/song"
import watchHistoryModel from "@/libs/models/watchHistory"
import { getServerUser } from "@/libs/supabase-server"
import ContinueListening from "@/components/dashboard/ContinueListening"
import SongGrid from "@/components/dashboard/SongGrid"

export default async function Home() {
  const [{ data: songs, error: songsError }, user] = await Promise.all([
    songModel.getDiscoverList(),
    getServerUser(),
  ])

  let history = []
  if (user) {
    const { data } = await watchHistoryModel.listForUser(user.id)
    history = data
  }

  if (songsError) {
    return (
      <div className="py-12 text-center text-[#AAAAAA]">
        Unable to load songs. Check your Supabase connection.
      </div>
    )
  }

  return (
    <div>
      <ContinueListening items={history} />
      <SongGrid songs={songs} />
    </div>
  )
}
