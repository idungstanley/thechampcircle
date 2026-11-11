import Image from "next/image"
import { BadgeCheck, Database, Eye, Lock, MessageCircle, PlayCircle, Sparkles, Timer, TrendingUp, Users, Wand2, XCircle } from "lucide-react"
import { funnel, formatPrice } from "@/lib/funnel-config"
import { Countdown, InlineCountdown } from "./countdown"
import { CtaButton } from "./cta-button"
import { HeroVideoPlayer } from "./hero-video-player"
import { DeadlineHeading, PriceNow, PriceWas } from "./pricing"

const { nichePack } = funnel

export const nichePackItems = [
  {
    icon: Database,
    title: "The Faceless Niche Database — 134 niches",
    text: "Every niche with its CPM and RPM, competition, chance for new creators, difficulty, example channels, estimated monthly income and the video format to use.",
  },
  {
    icon: PlayCircle,
    title: `My full YouTube Automation course — worth ${formatPrice(nichePack.value)}`,
    text: "The recorded classes: picking your niche, setting up your channel, AI scripts, voiceovers, editing, thumbnails and getting monetized.",
  },
  {
    icon: Wand2,
    title: "The all-in-one AI tool I use to make my videos",
    text: "Script, voiceover, images and clips in one place. Paste a YouTube link, and it studies that video's style and generates the script, voiceover and images for you.",
  },
  {
    icon: MessageCircle,
    title: "Direct WhatsApp access to me",
    text: "Stuck on your niche, your channel or your first video? Ask me directly and I'll show you what to do.",
  },
]

export function NicheUrgencyBar() {
  return (
    <div className="bg-champ-yellow px-4 py-2 text-center text-[13px] font-semibold text-champ-black sm:text-sm">
      <Timer className="mr-1.5 inline size-4 -translate-y-px" aria-hidden />
      Niche Pack <PriceNow /> <PriceWas className="line-through opacity-60" /> <InlineCountdown prefix="· closes in" />
    </div>
  )
}

export function NicheHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-champ-black">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#top" aria-label="The Champ Circle — top of page">
          <Image src="/brand/logo-full-transparent.png" alt="The Champ Circle" width={841} height={148} priority className="h-8 w-auto sm:h-9" />
        </a>
        <CtaButton size="md" location="header" className="hidden sm:inline-flex">
          Get the Niche Pack
        </CtaButton>
      </div>
    </header>
  )
}

function PriceBlock({ location }: { location: string }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-white/60">
          <DeadlineHeading />
        </p>
        <Countdown className="mt-3 justify-center" />
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-5xl font-bold text-champ-yellow">
          <PriceNow />
        </span>
        <PriceWas className="text-xl text-white/50 line-through" />
      </div>
      <CtaButton location={location} nudge className="w-full sm:w-auto">
        Get the Niche Pack — <PriceNow />
      </CtaButton>
      <p className="flex items-center gap-1.5 text-xs text-white/55">
        <Lock className="size-3.5" aria-hidden /> One payment · secured by Paystack · closes {nichePack.endsLabel}
      </p>
    </div>
  )
}

export function NicheHero() {
  return (
    <section id="top" className="bg-champ-black px-4 pb-16 pt-10 text-white sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-champ-yellow/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-champ-yellow">
          <span className="size-2 animate-pulse rounded-full bg-champ-yellow" aria-hidden />
          Faceless YouTube Niche Pack · closes soon
        </p>
        <h1 className="mt-6 text-balance text-[32px] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
          Stop guessing. Start with a faceless niche that's <span className="text-champ-yellow">already making money.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
          134 faceless YouTube niches with what they pay, how hard they are and which video format to use — plus my full
          course, the AI tool that makes the videos for you, and direct access to me. All for{" "}
          <span className="font-semibold text-white">
            <PriceNow />
          </span>
          .
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-4">
        {nichePackItems.map(({ icon: Icon, title }) => (
          <div key={title} className="flex items-center gap-3 rounded-xl bg-white/[0.06] p-4 text-left text-sm ring-1 ring-white/10 sm:flex-col sm:items-start">
            <Icon className="size-6 shrink-0 text-champ-yellow" aria-hidden />
            <span className="font-medium leading-snug">{title}</span>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <PriceBlock location="niche-hero" />
      </div>
    </section>
  )
}

const mistakes = [
  "You copy whatever niche you saw on TikTok — so does everyone else.",
  "You pick a niche that gets views but pays almost nothing per view.",
  "You spend 3 months posting before finding out the niche can't be monetized.",
]

export function NicheProblem() {
  return (
    <section className="bg-secondary px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">Why most channels fail</p>
        <h2 className="mt-3 text-balance text-center text-3xl font-bold tracking-tight sm:text-4xl">
          The niche decides how much you earn — before you upload a single video.
        </h2>
        <ul className="mt-10 space-y-3">
          {mistakes.map((m) => (
            <li key={m} className="flex gap-3 rounded-xl bg-white p-4 text-base leading-relaxed shadow-sm sm:p-5">
              <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden />
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-lg leading-relaxed">
          The same 100,000 views can pay <strong>$50</strong> in one niche and <strong>$1,500+</strong> in another. The Niche
          Pack shows you which is which — so you start in the right place.
        </p>
      </div>
    </section>
  )
}

/**
 * Faceless channels earning right now. Figures are vidIQ estimates checked on 11 Nov 2026.
 * Channel names are deliberately left out of the page (they're in the pack).
 */
const earners = [
  { niche: "POV car restoration", earn: 5729, subs: "67.3K", fact: "Started Aug 2025 · 1.9M views in 30 days" },
  { niche: "Bedtime history (for sleep)", earn: 7930, subs: "119K", fact: "Started Jul 2025 · 2.1M views in 30 days" },
  { niche: "Psychology explainers", earn: 6714, subs: "155K", fact: "2M views in the last 30 days" },
  { niche: "Animated story Shorts", earn: 11225, subs: "936K", fact: "Subscribers up 21% in 30 days" },
  { niche: "Zen & martial-arts wisdom (AI animation)", earn: 2840, subs: "82.8K", fact: "Started Feb 2026 · subscribers up 38% in 30 days" },
  { niche: "ASMR Shorts", earn: 5523, subs: "16.4K", fact: "Started May 2026" },
  { niche: "Motion comics (manhwa stories)", earn: 2952, subs: "19.9K", fact: "Started Jun 2026 · subscribers up 43% in 30 days" },
  { niche: "Dark psychology", earn: 2506, subs: "42.7K", fact: "Started Apr 2026" },
  { niche: "Science & human-history documentaries", earn: 2104, subs: "200K", fact: "Only 39 videos on the channel" },
]

export function EarningsProof() {
  return (
    <section id="proof" className="bg-champ-black px-4 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-champ-yellow">The evidence</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Faceless channels in these niches are earning right now.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-white/70">
            Estimated monthly earnings from vidIQ, checked on 11th November 2026. Many of these channels are less than a
            year old.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {earners.map((c) => (
            <figure key={c.niche} className="rounded-2xl bg-white p-5 text-champ-black shadow-xl">
              <div className="flex items-center gap-3">
                <span className="size-10 shrink-0 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 blur-[3px]" aria-hidden />
                <div className="min-w-0">
                  <span className="block select-none text-sm font-bold blur-[5px]" aria-hidden>
                    Hidden channel
                  </span>
                  <span className="block text-xs text-muted-foreground">{c.subs} subscribers · faceless</span>
                </div>
                <BadgeCheck className="ml-auto size-5 shrink-0 text-muted-foreground" aria-hidden />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.niche}</p>
              <div className="mt-3 rounded-xl bg-secondary p-4">
                <p className="text-xs font-medium text-muted-foreground">Est. monthly earnings</p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-emerald-600">
                  ${c.earn.toLocaleString("en-US")}
                  <span className="text-base font-semibold text-muted-foreground">/mo</span>
                </p>
              </div>
              <figcaption className="mt-3 flex items-center gap-1.5 text-xs font-medium">
                <TrendingUp className="size-3.5 shrink-0" aria-hidden /> {c.fact}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-white/50">
          Channel names are hidden — you get them in the Niche Pack. Figures are third-party estimates (vidIQ), not
          confirmed payouts. What a channel earns depends on its niche, audience and
          consistency.
        </p>
        <div className="mt-10 text-center">
          <CtaButton location="niche-proof">Show me these niches</CtaButton>
        </div>
      </div>
    </section>
  )
}

/** A few real rows from the database; the rest are shown blurred. */
const sampleNiches = [
  { name: "Tax & Small Business Finance", rpm: "$14–$25", chance: "Excellent", income: "$6K–$25K" },
  { name: "Legal Explainers", rpm: "$8–$22", chance: "Excellent", income: "$4K–$20K" },
  { name: "Engineering Explainers", rpm: "$11–$21", chance: "Good", income: "$4K–$15K" },
  { name: "Aviation Disasters & Secrets", rpm: "$5–$10", chance: "Excellent", income: "$3K–$10K" },
]
const lockedNiches = ["Factory & Manufacturing Process", "Know Your Rights Education", "Sleep Music & Ambient Sounds", "Book Summaries (Animated)", "Japa / Relocation Content"]

const categories = [
  "AI & Technology", "Finance & Investing", "Education & Science", "History & Documentary", "Business", "Motivation & Self-Help",
  "Relaxation & Ambient", "African & Local Language", "True Crime & Mystery", "POV & Storytelling", "Top Lists", "Travel & Geography",
  "Health & Wellness", "Kids & Education", "Horror Stories", "Food & Cooking", "Gaming", "Nature & Animals", "Cars", "Sports",
  "Lifestyle & DIY", "Movies & Entertainment", "Body Cam", "Legal & Law", "Manufacturing & Process", "Geopolitics",
]

export function NichePreview() {
  return (
    <section className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Inside the database</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">134 niches. 26 categories. Everything you need to choose.</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            For every niche: CPM and RPM, competition, chance for new creators, difficulty, example channels, estimated
            monthly income at 100K subscribers, automation potential and the exact video format to use.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border-2 border-champ-black">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-champ-black text-xs uppercase tracking-wider text-champ-yellow">
                <tr>
                  <th className="px-4 py-3">Niche</th>
                  <th className="px-4 py-3">RPM</th>
                  <th className="hidden px-4 py-3 sm:table-cell">New creator chance</th>
                  <th className="px-4 py-3">Est. monthly<span className="hidden sm:inline"> (100K subs)</span></th>
                </tr>
              </thead>
              <tbody>
                {sampleNiches.map((n) => (
                  <tr key={n.name} className="border-t border-border">
                    <td className="px-4 py-3 font-semibold">{n.name}</td>
                    <td className="whitespace-nowrap px-4 py-3">{n.rpm}</td>
                    <td className="hidden px-4 py-3 sm:table-cell">{n.chance}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-emerald-600">{n.income}</td>
                  </tr>
                ))}
                {lockedNiches.map((n) => (
                  <tr key={n} className="select-none border-t border-border" aria-hidden>
                    <td className="px-4 py-3 font-semibold blur-[5px]">{n}</td>
                    <td className="px-4 py-3 blur-[5px]">$0–$00</td>
                    <td className="hidden px-4 py-3 blur-[5px] sm:table-cell">Excellent</td>
                    <td className="px-4 py-3 blur-[5px]">$0K–$00K</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center gap-2 bg-secondary px-4 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Lock className="size-4" aria-hidden /> + 125 more niches unlocked in the Niche Pack
            </p>
            <CtaButton size="md" location="niche-table">
              Unlock all 134
            </CtaButton>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <li key={c} className="rounded-full border border-border px-3 py-1.5 text-sm">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function PackStack() {
  return (
    <section id="offer" className="bg-secondary px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Everything you get</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Not just a list. Everything you need to go from niche to first video.
          </h2>
        </div>

        <div className="mt-12 grid items-start gap-8 md:grid-cols-[3fr_2fr]">
          <ul className="space-y-4">
            {nichePackItems.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-champ-yellow text-champ-black">
                  <Icon className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{i === 0 ? "The pack" : `Bonus ${i}`}</p>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-3xl bg-black shadow-2xl ring-4 ring-champ-black">
              <HeroVideoPlayer src="/video/ai-tool.mp4" poster="/video/ai-tool-poster.jpg" />
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
              <Sparkles className="size-4" aria-hidden /> Watch: the AI tool I use for all my videos
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-xl overflow-hidden rounded-3xl border-2 border-champ-black bg-white text-center shadow-xl">
          <div className="bg-champ-black px-6 py-4 text-sm font-semibold text-champ-yellow">
            Closes {nichePack.endsLabel} at 11:59pm
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-muted-foreground">
              The course alone is worth <span className="line-through">{formatPrice(nichePack.value)}</span>
            </p>
            <p className="mt-1 text-5xl font-bold">
              <PriceNow />
            </p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">for everything · one payment</p>
            <Countdown tone="light" className="mt-6 justify-center" />
            <CtaButton location="niche-offer" nudge className="mt-6 w-full">
              Get the Niche Pack now
            </CtaButton>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="size-3.5" aria-hidden /> Card, bank transfer or USSD via Paystack
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const steps = [
  { icon: Lock, title: `Pay ${formatPrice(nichePack.price)}`, text: "Enter your name, email and WhatsApp number, then pay securely with Paystack." },
  { icon: MessageCircle, title: "Send me your receipt", text: "You'll land on a page with a WhatsApp button. Send me your receipt in one tap." },
  { icon: Users, title: "Get everything on WhatsApp", text: "I send you the niche database, the course link and the AI tool — and you can ask me questions." },
]

export function NicheHowItWorks() {
  return (
    <section className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-champ-black font-bold text-champ-yellow">{i + 1}</span>
                <Icon className="size-5 text-muted-foreground" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export const nicheFaqs = [
  {
    q: "What exactly do I get for ₦10,000?",
    a: `The Faceless Niche Database (134 niches), my full recorded YouTube Automation course (worth ${formatPrice(nichePack.value)}), the all-in-one AI tool I use to make my videos, and direct WhatsApp access to me for questions.`,
  },
  {
    q: "How do I receive everything?",
    a: "Right after you pay, you'll see a WhatsApp button. Send me your payment receipt and I'll send you the niche database, the course link and the tool on WhatsApp.",
  },
  {
    q: "Is this the live class?",
    a: "No. The Niche Pack gives you the recorded course, the database, the tool and access to me on WhatsApp. The 4-week live class is a separate programme.",
  },
  {
    q: "I'm a complete beginner. Is this for me?",
    a: "Yes. The course starts from zero, and the database tells you which niches are easier for new creators, so you don't start in the hardest place.",
  },
  {
    q: "Do I need a laptop or to show my face?",
    a: "No. Every niche in the database is faceless, and you can start with a phone. A laptop makes some tasks faster, but it isn't required.",
  },
  {
    q: "Where do the earnings figures come from?",
    a: "The channel earnings come from vidIQ, a YouTube analytics tool, checked on 11th November 2026. The niche income ranges are estimates for a channel with 100K subscribers. They're estimates, not promises.",
  },
  {
    q: "Will I definitely make money?",
    a: "Nobody can honestly guarantee that — YouTube decides monetization, and results depend on your effort and consistency. What the pack does is help you start in a niche that's already paying, with the tools and guidance to make the videos.",
  },
  {
    q: "When does the offer close?",
    a: `${nichePack.endsLabel} at 11:59pm. After that, this page closes.`,
  },
]

export function NicheFinalCta() {
  return (
    <section className="bg-champ-black px-4 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Eye className="mx-auto size-10 text-champ-yellow" aria-hidden />
        <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
          The right niche could be the difference between 3 wasted months and your first monetized channel.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
          Get the 134 niches, my course, the AI tool and access to me — before the Niche Pack closes.
        </p>
        <div className="mt-10">
          <PriceBlock location="niche-final" />
        </div>
      </div>
    </section>
  )
}
