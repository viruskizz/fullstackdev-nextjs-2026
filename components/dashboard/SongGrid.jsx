import SongCard from "./SongCard"

export default function SongGrid({ songs }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-white">Discover</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} variant="grid" />
        ))}
      </div>
    </section>
  )
}
