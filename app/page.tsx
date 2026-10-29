import { Coach, FAQ, FinalCta, Footer, Offer, Testimonials, WhoFor } from "@/components/funnel/bottom-sections"
import { StickyMobileCta, WhatsAppButton } from "@/components/funnel/floating"
import { Curriculum, Difference, Problem } from "@/components/funnel/middle-sections"
import { ProofGallery } from "@/components/funnel/proof-gallery"
import { Hero, SiteHeader, StatsStrip, UrgencyBar } from "@/components/funnel/top-sections"

// Rendered per request so the price is always the one in force right now
export const dynamic = "force-dynamic"

/** Step 1 of the funnel: the sales page. Every CTA leads to /register. */
export default function SalesPage() {
  return (
    <main className="min-h-screen">
      <UrgencyBar />
      <SiteHeader />
      <Hero />
      <StatsStrip />
      <ProofGallery />
      <Problem />
      <Difference />
      <Curriculum />
      <Testimonials />
      <WhoFor />
      <Coach />
      <Offer />
      <FAQ />
      <FinalCta />
      <Footer />
      <StickyMobileCta />
      <WhatsAppButton />
    </main>
  )
}
