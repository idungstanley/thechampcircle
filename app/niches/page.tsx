import type { Metadata } from "next"
import { FAQ, Footer } from "@/components/funnel/bottom-sections"
import { StickyMobileCta, WhatsAppButton } from "@/components/funnel/floating"
import {
  EarningsProof,
  NicheFinalCta,
  NicheHeader,
  NicheHero,
  NicheHowItWorks,
  NichePreview,
  NicheProblem,
  NicheUrgencyBar,
  PackStack,
  nicheFaqs,
} from "@/components/funnel/niche-sections"
import { PlanProvider } from "@/components/funnel/pricing"
import { ProofGallery } from "@/components/funnel/proof-gallery"

// Rendered per request so the offer closes on time
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Faceless YouTube Niche Pack — 134 Niches That Pay | The Champ Circle",
  description:
    "134 faceless YouTube niches with RPM, competition and income estimates, plus my full course, the AI tool I use and direct access to me. ₦10,000 for a limited time.",
  openGraph: {
    title: "134 faceless YouTube niches that are already making money",
    description: "Niche database + full course + AI video tool + direct access to me. ₦10,000 — closes soon.",
    images: ["/video/ai-tool-poster.jpg"],
  },
}

/** Low-ticket offer: niche database + course recordings + AI tool + WhatsApp access. */
export default function NichesPage() {
  return (
    <PlanProvider plan="niche">
      <main className="min-h-screen">
        <NicheUrgencyBar />
        <NicheHeader />
        <NicheHero />
        <NicheProblem />
        <EarningsProof />
        <NichePreview />
        <PackStack />
        <ProofGallery />
        <NicheHowItWorks />
        <FAQ items={nicheFaqs} />
        <NicheFinalCta />
        <Footer />
        <StickyMobileCta label="Get it now" countdownPrefix="Closes in" />
        <WhatsAppButton message="Hi Stanley! I have a question about the Niche Pack." />
      </main>
    </PlanProvider>
  )
}
