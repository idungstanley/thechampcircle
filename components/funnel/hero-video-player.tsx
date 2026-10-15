"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"
import { track } from "@/lib/track"

/** MP4 player with a large branded play button until the first play. */
export function HeroVideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 size-full"
        src={src}
        poster={poster || undefined}
        controls={started}
        playsInline
        preload="metadata"
        onPlay={() => {
          if (!started) track("ViewContent", { content_name: "Hero video" })
          setStarted(true)
        }}
      />
      {!started && (
        <button
          type="button"
          onClick={() => ref.current?.play()}
          className="group absolute inset-0 flex items-center justify-center bg-black/25"
          aria-label="Play video"
        >
          <span className="flex size-20 items-center justify-center rounded-full bg-champ-yellow text-champ-black shadow-xl transition-transform group-hover:scale-110 sm:size-24">
            <Play className="ml-1 size-9 fill-current sm:size-10" aria-hidden />
          </span>
        </button>
      )}
    </>
  )
}
