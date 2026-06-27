export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return "0:00"

  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  return `${mins}:${String(secs).padStart(2, "0")}`
}

export function getYoutubeVideoId(url) {
  if (!url) return null

  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1)
    }
    return parsed.searchParams.get("v")
  } catch {
    const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)
    return match?.[1] ?? null
  }
}
