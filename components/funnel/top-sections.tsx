import Image from "next/image"
import { CheckCircle2, Radio, Timer, UserRoundCheck } from "lucide-react"
import { funnel, formatPrice } from "@/lib/funnel-config"
import { Countdown, InlineCountdown } from "./countdown"
import { CtaButton } from "./cta-button"
import { VideoEmbed } from "./video-embed"

export function UrgencyBar() {
  return (
    <div className="bg-champ-yellow px-4 py-2 text-center text-[13px] font-semibold text-champ-black sm:text-sm">
      <Timer className="mr-1.5 inline size-4 -translate-y-px" aria-hidden />
      <span className="hidden sm:inline">
        Early price {formatPrice(funnel.price)} <span className="line-through opacity-60">{formatPrice(funnel.oldPrice)}</span>{" "}
      </span>
      <span className="sm:hidden">Save {formatPrice(funnel.oldPrice - funnel.price)} · </span>
      ends in <InlineCountdown />
    </div>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-champ-black">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#top" aria-label="The Champ Circle — home">
          <Image src="/brand/logo-full-transparent.png" alt="The Champ Circle" width={841} height={148} priority className="h-8 w-auto sm:h-9" />
        </a>
        <CtaButton size="md" location="header" className="hidden sm:inline-flex">
          Join the class
        </CtaButton>
      </div>
    </header>
  )
}

const heroTrust = [
  { icon: Radio, text: "100% live — no prerecorded videos" },
  { icon: UserRoundCheck, text: "Direct access to me until you're monetized" },
  { icon: CheckCircle2, text: "Beginner friendly · faceless channels" },
]

export function Hero() {
  return (
    <section id="top" className="bg-champ-black px-4 pb-16 pt-10 text-white sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-champ-yellow/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-champ-yellow">
          <span className="size-2 animate-pulse rounded-full bg-champ-yellow" aria-hidden />
          Live class · starts {funnel.classStartLabel}
        </p>
        <h1 className="mt-6 text-balance text-[32px] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
          Get your YouTube channel <span className="text-champ-yellow">monetized</span> — with a coach who stays
          with you until it happens.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
          A 4-week live YouTube Automation + AI class. You build a faceless channel while you learn, publish your first
          video in class, and keep direct access to me until YouTube approves your monetization.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <VideoEmbed />
        <p className="mt-3 text-center text-sm text-white/55">▲ Watch this short video before you register</p>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6 text-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-white/60">Early price ends in</p>
          <Countdown className="mt-3 justify-center" />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-champ-yellow sm:text-5xl">{formatPrice(funnel.price)}</span>
          <span className="text-xl text-white/50 line-through">{formatPrice(funnel.oldPrice)}</span>
        </div>
        <CtaButton location="hero" nudge className="w-full sm:w-auto" />
        <ul className="flex flex-col gap-2.5 text-sm text-white/80 sm:flex-row sm:gap-6">
          {heroTrust.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center justify-center gap-2">
              <Icon className="size-4 shrink-0 text-champ-yellow" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const stats = [
  { value: "4 weeks", label: "of live teaching" },
  { value: "12", label: "live classes · 18 hours" },
  { value: "1-on-1", label: "access until monetized" },
  { value: "0", label: "prerecorded videos" },
]

export function StatsStrip() {
  return (
    <section className="border-b border-border bg-white px-4 py-8">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-3xl font-bold text-champ-black sm:text-4xl">{s.value}</dd>
            <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
