import type { Metadata } from "next"
import { Coach, FAQ, FinalCta, Footer, Offer, Testimonials } from "@/components/funnel/bottom-sections"
import { StickyMobileCta, WhatsAppButton } from "@/components/funnel/floating"
import { Curriculum, Difference } from "@/components/funnel/middle-sections"
import { PlanProvider } from "@/components/funnel/pricing"
import { ProofGallery } from "@/components/funnel/proof-gallery"
import { JobReality, StudentFit, StudentHero, studentFaqs } from "@/components/funnel/student-sections"
import { SiteHeader, StatsStrip, UrgencyBar } from "@/components/funnel/top-sections"

// Rendered per request so the price is always the one in force right now
export const dynamic = "force-dynamic"

// A link you share directly with students — kept out of search engines
export const metadata: Metadata = {
  title: "Students: Learn a Skill That Can Pay You — The Champ Circle",
  description:
    "A 4-week live YouTube Automation + AI class at a special student price. Learn from your hostel, with your phone, without showing your face.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Students: build a skill that can pay you before you graduate",
    description: "4-week live YouTube Automation + AI class. Special student price. Starts 2nd November.",
    images: ["/video/poster.jpg"],
  },
}

/** Students-only sales page. Same flow as the main page, at the student price. */
export default function StudentsPage() {
  return (
    <PlanProvider plan="student">
      <main className="min-h-screen">
        <UrgencyBar />
        <SiteHeader />
        <StudentHero />
        <StatsStrip />
        <JobReality />
        <ProofGallery />
        <StudentFit />
        <Curriculum />
        <Difference />
        <Testimonials />
        <Coach />
        <Offer />
        <FAQ items={studentFaqs} />
        <FinalCta />
        <Footer />
        <StickyMobileCta />
        <WhatsAppButton />
      </main>
    </PlanProvider>
  )
}
