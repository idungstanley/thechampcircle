import Image from "next/image"
import { Check, Gift, Lock, Quote, ShieldCheck, UserRound, X } from "lucide-react"
import { funnel, testimonials } from "@/lib/funnel-config"
import { DeadlineSentence, FaqPriceAnswer, PriceLabel, PriceNextNote, PriceNow, PriceSave, PriceWas } from "./pricing"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Countdown } from "./countdown"
import { CtaButton } from "./cta-button"

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-secondary px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Student results</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            They started where you are now.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
              <Quote className="size-8 text-champ-yellow" aria-hidden />
              <blockquote className="mt-4 flex-1 leading-relaxed">“{t.quote}”</blockquote>
              {t.screenshot && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.screenshot} alt={`Proof from ${t.name}`} className="mt-5 rounded-lg border border-border" loading="lazy" />
              )}
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                {t.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.photo} alt="" className="size-11 rounded-full object-cover" loading="lazy" />
                ) : (
                  <span className="flex size-11 items-center justify-center rounded-full bg-champ-black font-bold text-champ-yellow">
                    {t.name.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">{t.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 text-center">
          <CtaButton location="testimonials">Be my next monetized student</CtaButton>
        </div>
      </div>
    </section>
  )
}

const forYou = [
  "Complete beginners who want a clear, step-by-step path",
  "People who want to earn from YouTube without showing their face",
  "Creators who've tried before and got stuck",
  "Anyone ready to put in a few focused hours every week",
]
const notForYou = [
  "People looking for “easy money with no work”",
  "Anyone not willing to attend live classes and do the practical tasks",
  "People who want to copy and re-upload other creators' videos",
]

export function WhoFor() {
  return (
    <section className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-champ-black p-6 sm:p-8">
          <h2 className="text-2xl font-bold">This class is for you if…</h2>
          <ul className="mt-6 space-y-3">
            {forYou.map((x) => (
              <li key={x} className="flex gap-3 leading-relaxed">
                <Check className="mt-1 size-5 shrink-0" aria-hidden />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-secondary p-6 sm:p-8">
          <h2 className="text-2xl font-bold">It's not for you if…</h2>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            {notForYou.map((x) => (
              <li key={x} className="flex gap-3 leading-relaxed">
                <X className="mt-1 size-5 shrink-0" aria-hidden />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Coach() {
  const { coach } = funnel
  return (
    <section className="bg-champ-black px-4 py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[2fr_3fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
          {coach.photo ? (
            <Image src={coach.photo} alt={coach.name} fill className="object-cover object-top" sizes="(min-width: 768px) 40vw, 90vw" />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-2 text-sm text-white/50">
              <UserRound className="size-12" aria-hidden />
              Add your photo
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-champ-yellow">Your coach</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{coach.name}</h2>
          <p className="mt-1 text-white/60">{coach.title}</p>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/80">
            {coach.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const stack = [
  "12 live classes over 4 weeks (18 hours of teaching)",
  "Step-by-step channel setup — niche, branding, content plan",
  "AI scriptwriting, voiceover and visuals workflow",
  "Editing, thumbnail and title training",
  "Algorithm and analytics breakdown for your own channel",
  "Private student community",
]

export function Offer() {
  return (
    <section id="offer" className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Join the class</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">Everything you get</h2>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border-2 border-champ-black shadow-xl">
          <div className="bg-champ-black px-6 py-4 text-center text-sm font-semibold text-champ-yellow">
            <DeadlineSentence />
          </div>
          <div className="p-6 sm:p-8">
            <ul className="space-y-3">
              {stack.map((x) => (
                <li key={x} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
                  {x}
                </li>
              ))}
              <li className="flex gap-3 rounded-xl bg-champ-yellow p-3 font-semibold">
                <Gift className="mt-0.5 size-5 shrink-0" aria-hidden />
                Direct access to me until your channel is monetized
              </li>
            </ul>
            <div className="mt-8 border-t border-border pt-8 text-center">
              <p className="text-muted-foreground">
                Was <PriceWas className="line-through" />
              </p>
              <p className="mt-1 text-5xl font-bold">
                <PriceNow />
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                <PriceLabel /> · one payment · you save <PriceSave />
              </p>
              <Countdown tone="light" className="mt-6 justify-center" />
              <CtaButton location="offer" nudge className="mt-6 w-full">
                Reserve my seat now
              </CtaButton>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="size-3.5" aria-hidden /> Secure payment · instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const faqs = [
  {
    q: "I'm a complete beginner. Can I join?",
    a: "Yes. The class starts from zero — what YouTube automation is, how YouTube pays, and how to choose a niche — before we build anything. Every class ends with a practical task so you never fall behind.",
  },
  {
    q: "Do I have to show my face?",
    a: "No. We focus on faceless channels using AI for scripts, voiceovers and visuals. If you'd like to build a personal-brand channel, the same principles apply.",
  },
  {
    q: "Are the classes prerecorded?",
    a: "No. There are no prerecorded videos. I teach every class live, and you can ask questions in real time.",
  },
  {
    q: "What does “access until monetized” mean?",
    a: "The live class runs for 4 weeks, but my support doesn't stop there. After the class ends, you can still reach me directly with questions about your channel until it's accepted into the YouTube Partner Program.",
  },
  {
    q: "Do you guarantee monetization?",
    a: "Monetization approval is decided by YouTube, so nobody can honestly guarantee it. What I can promise is that I won't leave you halfway: you'll learn exactly what YouTube looks for, and you keep access to me until your channel is monetized.",
  },
  {
    q: "When does the class start and how long is it?",
    a: `The first class is on ${funnel.classStartLabel}. It runs for 4 weeks — 3 live classes a week, 1h 30m each, 12 classes in total.`,
  },
  {
    q: "What do I need to join?",
    a: "A smartphone or laptop, a stable internet connection, a Gmail account, and a few focused hours each week. Most tools we use have free versions.",
  },
  {
    q: "Can I join if I have a job or I'm in school?",
    a: "Yes. The class is designed for people with busy schedules — about 4–5 hours of live class per week, plus time for your practical tasks.",
  },
  {
    q: "Why is the price going up?",
    a: <FaqPriceAnswer />,
  },
  {
    q: "What happens after I pay?",
    a: "You'll be taken straight to a welcome page with the link to join the private student group, plus everything you need to prepare before the first class.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-secondary px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-balance text-center text-3xl font-bold tracking-tight sm:text-4xl">Questions? Answered.</h2>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="rounded-xl border-0 bg-white px-5 last:border-b-0">
              <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="bg-champ-yellow px-4 py-16 text-champ-black sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
          A month from now, you'll wish you started today.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
          You can keep figuring it out alone — or you can learn live, build your channel step by step, and have me in
          your corner until you're monetized.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <CtaButton location="final" className="w-full bg-champ-black text-champ-yellow sm:w-auto">
            Reserve my seat — <PriceNow />
          </CtaButton>
          <p className="flex items-center gap-1.5 text-sm font-medium">
            <ShieldCheck className="size-4" aria-hidden /> <PriceNextNote />
          </p>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-champ-black px-4 pb-28 pt-12 text-sm text-white/55 sm:pb-12">
      <div className="mx-auto max-w-5xl text-center">
        <Image src="/brand/logo-full-transparent.png" alt="The Champ Circle" width={841} height={148} className="mx-auto h-8 w-auto" />
        <p className="mt-3 text-white/70">Learn together. Build with purpose.</p>
        <p className="mx-auto mt-6 max-w-3xl text-xs leading-relaxed">
          Disclaimer: Results vary. Monetization approval is decided by YouTube under the YouTube Partner Program policies.
          The results shown on this page are from real students and are not typical or guaranteed. Your results depend on
          your effort, consistency and niche. This site is not part of or endorsed by YouTube or Google.
        </p>
        <p className="mt-6 text-xs">© {new Date().getFullYear()} The Champ Circle. All rights reserved.</p>
      </div>
    </footer>
  )
}
