import { Play } from "lucide-react"
import { funnel } from "@/lib/funnel-config"

function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m?.[1]
}

export function VideoEmbed() {
  const { type, src, poster } = funnel.heroVideo
  const frame = "relative aspect-video w-full overflow-hidden rounded-2xl bg-black ring-1 ring-white/15"

  if (type === "youtube" && youtubeId(src)) {
    return (
      <div className={frame}>
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId(src)}?rel=0&modestbranding=1`}
          title="Watch: how The Champ Circle class works"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (type === "mp4" && src) {
    return (
      <div className={frame}>
        <video className="absolute inset-0 size-full" src={src} poster={poster || undefined} controls playsInline preload="metadata" />
      </div>
    )
  }

  // Placeholder until the video is added in lib/funnel-config.ts
  return (
    <div className={`${frame} flex flex-col items-center justify-center gap-4`}>
      <span className="flex size-20 items-center justify-center rounded-full bg-champ-yellow text-champ-black">
        <Play className="ml-1 size-9 fill-current" aria-hidden />
      </span>
      <p className="px-6 text-center text-sm text-white/60">
        Your video goes here — add it in <code className="text-champ-yellow">lib/funnel-config.ts</code>
      </p>
    </div>
  )
}
