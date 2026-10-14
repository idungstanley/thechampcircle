"use client"

import { useEffect, useState } from "react"
import { funnel } from "@/lib/funnel-config"
import { cn } from "@/lib/utils"

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    done: diff === 0,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function useCountdown() {
  const target = new Date(funnel.classStart).getTime()
  const [time, setTime] = useState<ReturnType<typeof remaining> | null>(null)
  useEffect(() => {
    setTime(remaining(target))
    const id = setInterval(() => setTime(remaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

const pad = (n: number) => String(n).padStart(2, "0")

/** Large boxed countdown. `tone="dark"` for black sections, `"light"` for white. */
export function Countdown({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const t = useCountdown()
  const units = [
    ["Days", t?.days],
    ["Hours", t?.hours],
    ["Mins", t?.minutes],
    ["Secs", t?.seconds],
  ] as const

  if (t?.done) {
    return (
      <p className={cn("font-semibold", tone === "dark" ? "text-champ-yellow" : "text-champ-black", className)}>
        Class has started.
      </p>
    )
  }

  return (
    <div className={cn("flex gap-2 sm:gap-3", className)} role="timer" aria-label="Time until class starts">
      {units.map(([label, value]) => (
        <div
          key={label}
          className={cn(
            "flex w-16 flex-col items-center rounded-xl py-2.5 sm:w-20 sm:py-3",
            tone === "dark" ? "bg-white/[0.07] ring-1 ring-white/10" : "bg-champ-black text-white",
          )}
        >
          <span
            className={cn(
              "text-2xl font-bold tabular-nums sm:text-3xl",
              tone === "dark" ? "text-champ-yellow" : "text-champ-yellow",
            )}
          >
            {value === undefined ? "--" : pad(value)}
          </span>
          <span className={cn("mt-0.5 text-[11px] font-medium uppercase tracking-wider", "text-white/60")}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

/** Compact inline countdown for bars, e.g. "11d 04h 22m 09s". */
export function InlineCountdown() {
  const t = useCountdown()
  if (!t) return <span className="tabular-nums">--d --h --m --s</span>
  if (t.done) return <span>now</span>
  return (
    <span className="tabular-nums">
      {t.days}d {pad(t.hours)}h {pad(t.minutes)}m {pad(t.seconds)}s
    </span>
  )
}
