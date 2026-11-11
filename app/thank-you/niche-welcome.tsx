import Image from "next/image"
import { Check, MessageCircle } from "lucide-react"
import { funnel, formatPrice } from "@/lib/funnel-config"
import { nichePackItems } from "@/components/funnel/niche-sections"
import { PurchaseEvent } from "./client"

/**
 * Shown after a verified Niche Pack payment. Delivery is manual: the buyer sends their
 * receipt on WhatsApp and Stanley replies with the niche database, course link and tool.
 */
export function NicheWelcome({ reference, amount, name }: { reference: string; amount: number; name: string }) {
  const firstName = name.trim().split(/\s+/)[0]
  const message = [
    `Hi Stanley! I just paid ${formatPrice(amount)} for the Niche Pack.`,
    name && `Name: ${name}`,
    `Payment reference: ${reference}`,
    "Here's my receipt 👇",
  ]
    .filter(Boolean)
    .join("\n")
  const whatsapp = `https://wa.me/${funnel.whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <main className="min-h-screen bg-champ-black text-white">
      <PurchaseEvent reference={reference} amount={amount} product="Niche Pack" />
      <header className="mx-auto flex h-16 max-w-5xl items-center px-4">
        <Image src="/brand/logo-full-transparent.png" alt="The Champ Circle" width={841} height={148} className="h-8 w-auto" />
      </header>

      <section className="px-4 pb-16 pt-10 text-center sm:pt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/celebrate.gif" alt="" width={150} height={150} className="mx-auto size-28 sm:size-32" />
        <h1 className="mx-auto mt-4 max-w-2xl text-balance text-[32px] font-bold leading-tight sm:text-5xl">
          Payment successful{firstName ? `, ${firstName}` : ""}! <span className="text-champ-yellow">One last step.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75">
          Send me your payment receipt on WhatsApp. As soon as I see it, I'll send you everything in your Niche Pack.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white p-6 text-left text-champ-black">
          <ol className="space-y-3 text-sm leading-relaxed">
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-champ-yellow text-xs font-bold">1</span>
              Take a screenshot of the receipt Paystack sent to your email (or this page).
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-champ-yellow text-xs font-bold">2</span>
              Tap the button below — your name and payment reference are already typed in.
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-champ-yellow text-xs font-bold">3</span>
              Attach the screenshot and press send.
            </li>
          </ol>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-lg font-bold text-white"
          >
            <MessageCircle className="size-5" aria-hidden /> Send my receipt on WhatsApp
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Payment reference: <span className="font-mono font-semibold text-champ-black">{reference}</span>
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-14 text-champ-black">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-2xl font-bold">What I'll send you</h2>
          <ul className="mt-6 space-y-3">
            {nichePackItems.map(({ title }) => (
              <li key={title} className="flex gap-3 rounded-xl bg-secondary p-4">
                <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
                {title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="px-4 py-10 text-center text-xs text-white/50">
        Didn't get a reply? Keep your payment reference — I reply to every receipt.
        <br />© {new Date().getFullYear()} The Champ Circle · Learn together. Build with purpose.
      </footer>
    </main>
  )
}
