import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CalendarPlus, CircleAlert, ClipboardList, ExternalLink, Laptop, MessageCircle, Users } from "lucide-react"
import { funnel } from "@/lib/funnel-config"
import { Countdown } from "@/components/funnel/countdown"
import { isPaymentSuccessful } from "@/lib/paystack"
import { CalendarButtons, PurchaseEvent, ShareButton } from "./client"

export const metadata: Metadata = {
  title: "Welcome — The Champ Circle",
  robots: { index: false, follow: false },
}

const prepare = [
  "A smartphone or laptop with a stable internet connection",
  "A Gmail account you'll use for your channel",
  "CapCut installed (free) — we'll use it for editing",
  "A notebook and 2–3 niche ideas you're curious about",
]

/**
 * Step 3 of the funnel. Paystack redirects here with ?reference=... after checkout.
 * The group link and form are only shown once Paystack confirms the payment.
 */
export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ reference?: string; trxref?: string }> }) {
  const params = await searchParams
  const reference = params.reference || params.trxref || ""
  if (!reference || !(await isPaymentSuccessful(reference))) return <PaymentNotConfirmed hasReference={Boolean(reference)} />

  const whatsappConfirm = funnel.whatsappNumber
    ? `https://wa.me/${funnel.whatsappNumber}?text=${encodeURIComponent(
        "Hi! I just paid for The Champ Circle live class. Here's my payment receipt:",
      )}`
    : ""
  const formEmbed = funnel.onboardingFormUrl ? `${funnel.onboardingFormUrl}?embedded=true` : ""
  const stepCount = 3 + (formEmbed ? 1 : 0) + (whatsappConfirm ? 1 : 0)
  let n = 0

  return (
    <main className="min-h-screen bg-champ-black text-white">
      <PurchaseEvent reference={reference} />
      <header className="mx-auto flex h-16 max-w-5xl items-center px-4">
        <Image src="/brand/logo-full-transparent.png" alt="The Champ Circle" width={841} height={148} className="h-8 w-auto" />
      </header>

      <section className="px-4 pb-12 pt-10 text-center sm:pt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/celebrate.gif" alt="" width={150} height={150} className="mx-auto size-28 sm:size-32" />
        <h1 className="mx-auto mt-4 max-w-2xl text-balance text-[32px] font-bold leading-tight sm:text-5xl">
          You're in! Welcome to <span className="text-champ-yellow">The Champ Circle.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75">
          Your payment was successful and your seat is reserved. Complete the steps below so you're ready for the first
          class.
        </p>
        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-wider text-white/60">First class starts in</p>
          <Countdown className="mt-3 justify-center" />
          <p className="mt-3 text-sm text-white/60">{funnel.classStartLabel}</p>
        </div>
      </section>

      <section className="bg-white px-4 py-14 text-champ-black sm:py-20">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Do these {stepCount} things now</h2>

          {formEmbed && (
            <Step n={++n} icon={ClipboardList} title="Fill the student form" important>
              <p>Takes 10–15 minutes. Your answers help me understand you, your goals and your channel before class starts.</p>
              <a
                href={funnel.onboardingFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-champ-black px-6 py-3.5 font-bold text-champ-yellow sm:w-auto"
              >
                <ExternalLink className="size-5" aria-hidden /> Open the form
              </a>
              <iframe
                src={formEmbed}
                title="Champ Circle student form"
                className="mt-5 -ml-14 h-[1100px] w-[calc(100%+3.5rem)] rounded-xl border border-border bg-white sm:ml-0 sm:h-[900px] sm:w-full"
                loading="lazy"
              >
                Loading form…
              </iframe>
            </Step>
          )}

          <Step n={++n} icon={Users} title="Join the private student group" important>
            <p>All class links, updates and announcements are shared here. Don't skip this step.</p>
            {funnel.communityLink ? (
              <a
                href={funnel.communityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-champ-black px-6 py-3.5 font-bold text-champ-yellow sm:w-auto"
              >
                <Users className="size-5" aria-hidden /> Join the student group
              </a>
            ) : (
              <p className="mt-3 rounded-lg border-2 border-dashed border-input p-3 text-sm text-muted-foreground">
                Add <code>communityLink</code> in lib/funnel-config.ts
              </p>
            )}
          </Step>

          <Step n={++n} icon={CalendarPlus} title="Add the first class to your calendar">
            <p>Set a reminder so you don't miss the start on {funnel.classStartLabel}.</p>
            <CalendarButtons />
          </Step>

          {whatsappConfirm && (
            <Step n={++n} icon={MessageCircle} title="Send me your payment receipt">
              <p>Send a screenshot of your receipt on WhatsApp so I can confirm your seat personally.</p>
              <a
                href={whatsappConfirm}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-bold text-white sm:w-auto"
              >
                <MessageCircle className="size-5" aria-hidden /> Message me on WhatsApp
              </a>
            </Step>
          )}

          <Step n={++n} icon={Laptop} title="Get ready for class 1">
            <ul className="space-y-2">
              {prepare.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-champ-black" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </Step>
        </div>
      </section>

      <section className="bg-champ-yellow px-4 py-14 text-center text-champ-black">
        <h2 className="text-2xl font-bold sm:text-3xl">Know someone who should be in this class?</h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed">
          Learning is easier with a friend. Share the class with them before the early price ends.
        </p>
        <ShareButton />
      </section>

      <footer className="px-4 py-10 text-center text-xs text-white/50">
        Questions about your payment? {funnel.whatsappNumber ? "Message me on WhatsApp." : "Reply to your payment email."}
        <br />© {new Date().getFullYear()} The Champ Circle · Learn together. Build with purpose.
      </footer>
    </main>
  )
}

function Step({
  n,
  icon: Icon,
  title,
  important,
  children,
}: {
  n: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  important?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={`rounded-2xl p-6 sm:p-7 ${important ? "border-2 border-champ-black" : "bg-secondary"}`}>
      <div className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-champ-yellow font-bold">{n}</span>
        <div className="min-w-0 flex-1 leading-relaxed">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            {title}
            <Icon className="size-5 text-muted-foreground" />
          </h3>
          <div className="mt-1 text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  )
}

function PaymentNotConfirmed({ hasReference }: { hasReference: boolean }) {
  const help = funnel.whatsappNumber
    ? `https://wa.me/${funnel.whatsappNumber}?text=${encodeURIComponent(
        "Hi! I tried to pay for The Champ Circle live class but my payment wasn't confirmed.",
      )}`
    : ""
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-champ-black px-4 text-center text-white">
      <Image src="/brand/logo-full-transparent.png" alt="The Champ Circle" width={841} height={148} className="h-8 w-auto" />
      <span className="mt-10 flex size-16 items-center justify-center rounded-full bg-white/10 text-champ-yellow">
        <CircleAlert className="size-8" aria-hidden />
      </span>
      <h1 className="mt-6 max-w-xl text-balance text-3xl font-bold sm:text-4xl">
        {hasReference ? "We couldn't confirm your payment yet" : "Complete your payment to join"}
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-white/70">
        {hasReference
          ? "If you were charged, don't worry — your money is safe. Refresh this page in a minute, or message us and we'll sort it out quickly."
          : "This page unlocks after a successful payment. Reserve your seat to get the student group link and onboarding form."}
      </p>
      <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
        <Link href="/register" className="rounded-full bg-champ-yellow px-6 py-3.5 font-bold text-champ-black">
          {hasReference ? "Try payment again" : "Reserve my seat"}
        </Link>
        {help && (
          <a href={help} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-6 py-3.5 font-semibold">
            Message us on WhatsApp
          </a>
        )}
      </div>
    </main>
  )
}
