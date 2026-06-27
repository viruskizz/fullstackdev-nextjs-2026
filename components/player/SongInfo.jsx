import { formatDuration } from "@/libs/format"

export default function SongInfo({ song, progress }) {
  const progressPercent =
    progress && song.duration_seconds
      ? Math.min(100, Math.round((progress / song.duration_seconds) * 100))
      : 0

  return (
    <div className="mt-4">
      <h1 className="text-xl font-semibold text-white sm:text-2xl">{song.title}</h1>
      <p className="mt-2 text-sm text-[#AAAAAA]">
        {song.artist_name}
        {song.duration_seconds != null && (
          <>
            {" "}
            &bull; {formatDuration(song.duration_seconds)}
          </>
        )}
      </p>
      {progressPercent > 0 && (
        <div className="mt-3">
          <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-[#3f3f3f]">
            <div
              className="h-full bg-[#FF0000]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-[#717171]">
            Resume from {formatDuration(progress)}
          </p>
        </div>
      )}
    </div>
  )
}
