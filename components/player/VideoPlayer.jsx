"use client"

import { useEffect, useRef, useCallback } from "react"
import { saveWatchProgress } from "@/app/songs/actions"
import { getYoutubeVideoId } from "@/libs/format"

export default function VideoPlayer({
  youtubeUrl,
  songId,
  title,
  initialProgress = 0,
  isSignedIn = false,
}) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const intervalRef = useRef(null)
  const lastSavedRef = useRef(0)

  const videoId = getYoutubeVideoId(youtubeUrl)

  const persistProgress = useCallback(async () => {
    if (!isSignedIn || !playerRef.current?.getCurrentTime) return

    const currentTime = Math.floor(playerRef.current.getCurrentTime())
    if (currentTime <= lastSavedRef.current) return

    lastSavedRef.current = currentTime
    await saveWatchProgress(songId, currentTime)
  }, [isSignedIn, songId])

  useEffect(() => {
    if (!videoId || !containerRef.current) return

    let cancelled = false

    function createPlayer() {
      if (cancelled || !containerRef.current) return

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            if (initialProgress > 0) {
              event.target.seekTo(initialProgress, true)
            }
            if (isSignedIn) {
              persistProgress()
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              intervalRef.current = window.setInterval(persistProgress, 10000)
            } else if (intervalRef.current) {
              window.clearInterval(intervalRef.current)
              intervalRef.current = null
              persistProgress()
            }
          },
        },
      })
    }

    if (window.YT?.Player) {
      createPlayer()
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.()
        createPlayer()
      }

      if (!document.getElementById("youtube-iframe-api")) {
        const script = document.createElement("script")
        script.id = "youtube-iframe-api"
        script.src = "https://www.youtube.com/iframe_api"
        document.body.appendChild(script)
      }
    }

    return () => {
      cancelled = true
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
      playerRef.current?.destroy?.()
      playerRef.current = null
    }
  }, [videoId, initialProgress, isSignedIn, persistProgress])

  if (!videoId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-[#181818] text-[#AAAAAA]">
        Video unavailable
      </div>
    )
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
      <div ref={containerRef} className="h-full w-full" title={title} />
    </div>
  )
}
