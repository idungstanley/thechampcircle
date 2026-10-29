import { BookOpen, Briefcase, CheckCircle2, Clock, GraduationCap, Laptop, Radio, Smartphone, UserRoundCheck, Wallet } from "lucide-react"
import { funnel } from "@/lib/funnel-config"
import { Countdown } from "./countdown"
import { CtaButton } from "./cta-button"
import { DeadlineHeading, PriceNow, PriceWas } from "./pricing"
import { VideoEmbed } from "./video-embed"

const heroTrust = [
  { icon: GraduationCap, text: "Special student price" },
  { icon: Radio, text: "100% live — no prerecorded videos" },
  { icon: UserRoundCheck, text: "Direct access to me until you're monetized" },
]

export function StudentHero() {
  return (
    <section id="top" className="bg-champ-black px-4 pb-16 pt-10 text-white sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-champ-yellow/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-champ-yellow">
          <GraduationCap className="size-4" aria-hidden />
          For students only · starts {funnel.classStartLabel}
        </p>
        <h1 className="mt-6 text-balance text-[32px] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
          Don't wait for a job after school. <span className="text-champ-yellow">Build a skill that can pay you</span>{" "}
          while you're still a student.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
          Learn YouTube automation with AI in a 4-week live class — from your hostel, with your phone or laptop, without
          showing your face. Build your own channel while you learn, and keep direct access to me until it's monetized.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <VideoEmbed />
        <p className="mt-3 text-center text-sm text-white/55">▲ Watch this short video before you register</p>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6 text-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-white/60">
            <DeadlineHeading />
          </p>
          <Countdown className="mt-3 justify-center" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-champ-yellow sm:text-5xl">
              <PriceNow />
            </span>
            <PriceWas className="text-xl text-white/50 line-through" />
          </div>
          <p className="text-sm font-medium text-white/60">Student price · one payment</p>
        </div>
        <CtaButton location="student-hero" nudge className="w-full sm:w-auto" />
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

const realities = [
  "Graduates are spending years searching for jobs that aren't there.",
  "Many of the jobs that do exist pay far less than the cost of living.",
  "Employers keep asking for “experience” — but nobody wants to give you your first chance.",
]

export function JobReality() {
  return (
    <section className="bg-secondary px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">Let's be honest</p>
        <h2 className="mt-3 text-balance text-center text-3xl font-bold tracking-tight sm:text-4xl">
          A certificate alone isn't enough in Nigeria anymore.
        </h2>
        <ul className="mt-10 space-y-3">
          {realities.map((r) => (
            <li key={r} className="flex gap-3 rounded-xl bg-white p-4 text-base leading-relaxed shadow-sm sm:p-5">
              <Briefcase className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-2xl bg-champ-black p-6 text-white sm:p-8">
          <p className="text-xl font-bold sm:text-2xl">
            The students who win are the ones who <span className="text-champ-yellow">start building a skill before they graduate.</span>
          </p>
          <p className="mt-3 leading-relaxed text-white/75">
            You don't need to wait for a company to hire you. A YouTube channel is something you own. It's built with
            skills you can practise every day — research, scriptwriting, editing, AI — and it can earn from audiences all
            over the world. Start now, while you have time on your side, and you'll graduate with more than a certificate.
          </p>
          <div className="mt-6">
            <CtaButton location="student-reality">I'm ready to start</CtaButton>
          </div>
        </div>
      </div>
    </section>
  )
}

const fits = [
  { icon: Smartphone, title: "Your phone is enough to start", text: "Edit with CapCut and create with free AI tools. No camera, no studio, no expensive gadgets." },
  { icon: Clock, title: "Fits around your lectures", text: "3 live classes a week, 1h 30m each. Plan them around lectures and exams." },
  { icon: Laptop, title: "Learn from your hostel", text: "Everything is online. All you need is data and the willingness to practise." },
  { icon: Wallet, title: "No big capital needed", text: "No shop, no stock, no rent. Your main investment is your time and this class." },
  { icon: BookOpen, title: "Skills that last", text: "Research, writing, editing and AI are skills you'll use long after the class ends." },
  { icon: CheckCircle2, title: "Faceless — stay private", text: "Your classmates don't need to know it's you. You never have to show your face." },
]

export function StudentFit() {
  return (
    <section className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Built for student life</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">You can do this while you're still in school.</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border p-6">
              <span className="flex size-12 items-center justify-center rounded-xl bg-champ-yellow text-champ-black">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const studentFaqs = [
  {
    q: "Why is it cheaper for students?",
    a: "Because I want more young people to start building a real skill before they graduate. It's the same live class, the same curriculum and the same access to me — just a special price for students.",
  },
  {
    q: "Can I combine this with my lectures and exams?",
    a: "Yes. There are 3 live classes a week, 1h 30m each. The practical tasks are small steps you can do in your free time.",
  },
  {
    q: "I only have a phone. Can I still join?",
    a: "Yes. You can follow the classes, edit in CapCut and use AI tools on your phone. A laptop makes some tasks faster, but it isn't required to start.",
  },
  {
    q: "Do I have to show my face?",
    a: "No. We build faceless channels using AI for scripts, voiceovers and visuals.",
  },
  {
    q: "Will I definitely make money?",
    a: "Monetization is decided by YouTube, and results depend on your effort and consistency, so nobody can honestly guarantee it. What I can promise is that I'll teach you live, step by step, and stay with you until your channel is monetized.",
  },
  {
    q: "When does the class start?",
    a: `The first class is on ${funnel.classStartLabel}. It runs for 4 weeks — 12 live classes in total.`,
  },
  {
    q: "What happens after I pay?",
    a: "You'll be taken straight to a welcome page with the link to join the private student group and a short form to fill, plus everything you need to prepare before the first class.",
  },
]
