import Image from "next/image"
import Link from "next/link"
import { formatDuration } from "@/libs/format"

function PlayIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default function SongCard({ song, variant = "grid", progress }) {
  const href = `/songs/${song.id}`
  const progressPercent =
    progress && song.duration_seconds
      ? Math.min(100, Math.round((progress / song.duration_seconds) * 100))
      : 0

  const cardClass =
    variant === "horizontal"
      ? "group flex w-64 shrink-0 flex-col gap-2"
      : "group flex flex-col gap-2"

  return (
    <Link
      href={href}
      className={`${cardClass} rounded-xl p-2 transition-colors hover:bg-[#262626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-[#181818]">
        <Image
          src={song.cover_image || "/images/cover.png"}
          alt={song.title}
          fill
          sizes={variant === "horizontal" ? "256px" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
          <PlayIcon />
        </div>
        {song.duration_seconds != null && (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {formatDuration(song.duration_seconds)}
          </span>
        )}
        {progressPercent > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-[#FF0000]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {song.artist_image && (
          <Image
            src={song.artist_image}
            alt={song.artist_name || "Artist"}
            width={36}
            height={36}
            className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
            {song.title}
          </h3>
          <p className="mt-1 truncate text-sm text-[#AAAAAA]">
            {song.artist_name}
          </p>
          {(song.album_title || song.genre) && (
            <p className="truncate text-xs text-[#717171]">
              {song.album_title || song.genre}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
