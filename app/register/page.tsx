import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Lock } from "lucide-react"
import { funnel, formatPrice } from "@/lib/funnel-config"
import { Countdown } from "@/components/funnel/countdown"
import { CheckoutForm } from "./checkout-form"

export const metadata: Metadata = {
  title: "Reserve your seat — The Champ Circle",
  robots: { index: false },
}

const included = [
  "12 live classes over 4 weeks",
  "No prerecorded videos — taught live by me",
  "Practical tasks: launch your channel and publish your first video",
  "Private student community",
  "Direct access to me until you're monetized",
]

/** Step 2 of the funnel: order summary → payment link. */
export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <header className="bg-champ-black">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" aria-label="Back to class details">
            <Image src="/brand/logo-full-transparent.png" alt="The Champ Circle" width={841} height={148} className="h-8 w-auto" />
          </Link>
          <span className="flex items-center gap-1.5 text-xs font-medium text-white/60">
            <Lock className="size-3.5" aria-hidden /> Secure checkout
          </span>
        </div>
      </header>

      <ol className="mx-auto flex max-w-5xl items-center justify-center gap-2 px-4 pt-8 text-xs font-semibold sm:gap-4 sm:text-sm">
        {["Class details", "Reserve seat", "Welcome"].map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={
                i === 1
                  ? "flex size-6 items-center justify-center rounded-full bg-champ-black text-champ-yellow"
                  : i === 0
                    ? "flex size-6 items-center justify-center rounded-full bg-champ-yellow text-champ-black"
                    : "flex size-6 items-center justify-center rounded-full bg-white text-muted-foreground ring-1 ring-border"
              }
            >
              {i === 0 ? <Check className="size-3.5" aria-hidden /> : i + 1}
            </span>
            <span className={i === 2 ? "text-muted-foreground" : ""}>{s}</span>
            {i < 2 && <span className="mx-1 h-px w-6 bg-border sm:w-10" aria-hidden />}
          </li>
        ))}
      </ol>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-[3fr_2fr] md:py-12">
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold sm:text-3xl">You're one step away.</h1>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Secure your seat in the {funnel.programName} at the early price before it goes back to{" "}
            {formatPrice(funnel.oldPrice)}.
          </p>
          <CheckoutForm />
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-champ-black p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/60">Order summary</p>
            <p className="mt-3 text-lg font-semibold">{funnel.programName}</p>
            <p className="text-sm text-white/60">Starts {funnel.classStartLabel}</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {included.map((x) => (
                <li key={x} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-champ-yellow" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1.5 border-t border-white/10 pt-5 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Regular price</span>
                <span className="line-through">{formatPrice(funnel.oldPrice)}</span>
              </div>
              <div className="flex justify-between text-champ-yellow">
                <span>Early discount</span>
                <span>−{formatPrice(funnel.oldPrice - funnel.price)}</span>
              </div>
              <div className="flex justify-between pt-2 text-xl font-bold">
                <span>Total today</span>
                <span>{formatPrice(funnel.price)}</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-champ-black p-6 text-center">
            <p className="text-sm font-semibold text-white/70">Early price ends in</p>
            <Countdown className="mt-3 justify-center" />
          </div>
        </aside>
      </div>
    </main>
  )
}
