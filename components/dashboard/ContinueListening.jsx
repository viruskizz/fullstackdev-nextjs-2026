import SongCard from "./SongCard"

export default function ContinueListening({ items }) {
  if (!items?.length) {
    return null
  }

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold text-white">Continue listening</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <SongCard
            key={item.id}
            song={item}
            variant="horizontal"
            progress={item.progress}
          />
        ))}
      </div>
    </section>
  )
}
