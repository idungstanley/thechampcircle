import { Check, Clock, MessagesSquare, Radio, Sparkles, Wrench, X } from "lucide-react"
import { curriculum, deliverables } from "@/lib/curriculum"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CtaButton } from "./cta-button"

const pains = [
  "You've watched hours of YouTube automation videos, but you still don't know where to start.",
  "You uploaded videos that got 12 views — and you have no idea why.",
  "You bought a course full of old recordings, and nobody answered when you got stuck.",
  "You're scared of picking the wrong niche or getting flagged for \"reused content\".",
  "You've been \"about to start\" for months.",
]

export function Problem() {
  return (
    <section className="bg-secondary px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-balance text-center text-3xl font-bold tracking-tight sm:text-4xl">Does this sound like you?</h2>
        <ul className="mt-10 space-y-3">
          {pains.map((p) => (
            <li key={p} className="flex gap-3 rounded-xl bg-white p-4 text-base leading-relaxed shadow-sm sm:p-5">
              <X className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-2xl bg-champ-black p-6 text-white sm:p-8">
          <p className="text-xl font-bold sm:text-2xl">
            It's not that you can't do it. <span className="text-champ-yellow">You've been doing it alone.</span>
          </p>
          <p className="mt-3 leading-relaxed text-white/75">
            Most people don't fail on YouTube because they're not smart enough. They fail because nobody looks at their
            channel and tells them exactly what to fix. That's what this class is built to change.
          </p>
        </div>
      </div>
    </section>
  )
}

const pillars = [
  {
    icon: Radio,
    title: "Live classes, not recordings",
    text: "No prerecorded videos. I teach every class live, so you can ask questions and get answers on the spot.",
  },
  {
    icon: MessagesSquare,
    title: "Access to me until you're monetized",
    text: "The 4 weeks end, but my support doesn't. You keep direct access to me until your channel is approved for monetization.",
  },
  {
    icon: Wrench,
    title: "Build while you learn",
    text: "Every class has a practical task. You don't just listen — you launch your channel and publish your first video during the class.",
  },
  {
    icon: Sparkles,
    title: "AI-powered, faceless workflow",
    text: "Use AI for research, scripts, voiceovers and visuals — the right way, so YouTube sees original, valuable content.",
  },
]

const compare = [
  ["Prerecorded videos you watch alone", "Live classes taught by me"],
  ["Support ends when you buy", "Access to me until you're monetized"],
  ["Theory for weeks before you start", "Channel launched in week 1"],
  ["Generic advice for everyone", "Feedback on your own channel"],
]

export function Difference() {
  return (
    <section className="bg-champ-black px-4 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-champ-yellow">Why this works</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            This isn't another course you'll never finish.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
              <span className="flex size-12 items-center justify-center rounded-xl bg-champ-yellow text-champ-black">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl ring-1 ring-white/15">
          <div className="grid grid-cols-2 text-sm font-semibold sm:text-base">
            <div className="bg-white/[0.06] p-4 text-white/60">Typical online course</div>
            <div className="bg-champ-yellow p-4 text-champ-black">The Champ Circle</div>
          </div>
          {compare.map(([bad, good]) => (
            <div key={bad} className="grid grid-cols-2 border-t border-white/10 text-sm sm:text-base">
              <div className="flex gap-2 p-4 text-white/60">
                <X className="mt-0.5 size-4 shrink-0" aria-hidden />
                {bad}
              </div>
              <div className="flex gap-2 bg-white/[0.04] p-4 font-medium">
                <Check className="mt-0.5 size-4 shrink-0 text-champ-yellow" aria-hidden />
                {good}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Curriculum() {
  return (
    <section id="curriculum" className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">What you'll learn</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            4 weeks. 12 live classes. One monetizable channel.
          </h2>
          <p className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="size-4" aria-hidden /> 3 classes a week · 1h 30m each · 18 hours of live teaching
          </p>
        </div>

        <Accordion type="multiple" defaultValue={["Week 1"]} className="mt-12 space-y-4">
          {curriculum.map((w) => (
            <AccordionItem key={w.week} value={w.week} className="overflow-hidden rounded-2xl border border-border last:border-b">
              <AccordionTrigger className="items-center px-5 py-5 hover:no-underline sm:px-6">
                <span className="flex items-center gap-4">
                  <span className="shrink-0 rounded-lg bg-champ-black px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-champ-yellow">
                    {w.week}
                  </span>
                  <span className="text-base font-semibold sm:text-lg">{w.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-6 sm:px-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {w.classes.map((c, i) => (
                    <div key={c.title} className="rounded-xl bg-secondary p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Class {i + 1}</p>
                      <h3 className="mt-1 font-semibold">{c.title}</h3>
                      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                        {c.points.map((p) => (
                          <li key={p} className="flex gap-2">
                            <Check className="mt-1 size-3.5 shrink-0 text-champ-black" aria-hidden />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-4 rounded-lg bg-champ-yellow px-4 py-2.5 text-sm font-semibold text-champ-black">
                  Practical outcome: {w.outcome}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-14 rounded-2xl bg-champ-black p-6 text-white sm:p-10">
          <h3 className="text-2xl font-bold">By the end of the class, you'll have:</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {deliverables.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-champ-yellow text-champ-black">
                  <Check className="size-4" aria-hidden />
                </span>
                {d}
              </li>
            ))}
          </ul>
          <CtaButton location="curriculum" className="mt-8 w-full sm:w-auto">
            Yes, I want this — reserve my seat
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
