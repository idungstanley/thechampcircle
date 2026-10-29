/**
 * THE CHAMP CIRCLE — FUNNEL SETTINGS
 * ----------------------------------
 * Everything you need to change before running ads lives in this file.
 * Search for "TODO" to find the items that still need your input.
 */

export const funnel = {
  brand: "The Champ Circle",
  programName: "YouTube Automation + AI Live Class",
  // TODO: your live domain, e.g. "https://thechampcircle.com" (used for link previews on WhatsApp/Facebook).
  siteUrl: "https://thechampcircle.com",

  // --- Payment -------------------------------------------------------------
  // Paystack is connected through the PAYSTACK_SECRET_KEY environment variable
  // (.env.local for local testing; your host's environment settings for production).

  // --- Price ---------------------------------------------------------------
  price: 50000, // early price, until class starts
  oldPrice: 75000, // regular price
  // Limited-time flash discount. Shown (and charged) only until `endsAt`, then the
  // site switches back to `price` automatically. Set endsAt to "" to switch it off.
  flashSale: { price: 40000, startsAt: "2026-10-29T13:15:00+01:00", endsAt: "2026-10-29T16:20:00+01:00" },
  currency: "NGN",
  currencySymbol: "₦",

  // --- Dates ---------------------------------------------------------------
  // The countdown runs to this moment. Lagos time (WAT, UTC+1).
  // TODO: change 19:00 to the real first-class time if different.
  classStart: "2026-11-02T19:00:00+01:00",
  classStartLabel: "Monday, 2nd November 2026",

  // --- Hero video ----------------------------------------------------------
  // To switch to YouTube later: { type: "youtube", src: "https://www.youtube.com/watch?v=XXXXXXXXXXX" }
  heroVideo: { type: "mp4", src: "/video/campaign.mp4", poster: "/video/poster.jpg" } as {
    type: "youtube" | "mp4" | "none"
    src: string
    poster?: string
  },

  // --- Contact / community -------------------------------------------------
  // TODO: WhatsApp number in international format, no "+" or spaces. e.g. "2348012345678"
  whatsappNumber: "2349039267685",
  // The private WhatsApp group students join after paying.
  communityLink: "https://chat.whatsapp.com/FEAcC9Ib8J10DVFftOhiu9?s=cl&p=i&ilr=4&iam=2",
  // Student onboarding form shown on the thank-you page (Google Forms "viewform" link).
  onboardingFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSet2eSeTCbGpVoyqMdMsoah22bqif8T65STterTvYl_zr_JoA/viewform",

  // --- Tracking (optional but strongly recommended for ads) ---------------
  // TODO: your Meta (Facebook/Instagram) Pixel ID. Leave "" to disable.
  metaPixelId: "",
  // Optional: a URL that also receives each registration as JSON before payment
  // (e.g. a Google Apps Script web app, Make/Zapier webhook) so you can follow up
  // with people who don't finish paying. Paystack already stores paid students' details.
  leadWebhookUrl: "https://script.google.com/macros/s/AKfycbzDtBAqOgC584SB8cdgEnqQgB0VKSpFdSMdzfPggmR2F3ygnNowcAl3y_Qky_B5FXx5/exec",

  // --- Coach ---------------------------------------------------------------
  // TODO: your name, photo (put it in /public/coach.jpg) and short story.
  coach: {
    name: "Sunday Stanley",
    title: "Founder, The Champ Circle",
    photo: "/coach.webp",
    bio: [
      "My faceless channel has pulled 15.9 million views in the last 90 days and over $12,000 in revenue this year — and I've helped students get their own YouTube Partner Program approval emails.",
      "In this class I teach you live, look at your channel personally, and stay with you until YouTube approves your monetization.",
    ],
  },
}

/**
 * PROOF SCREENSHOTS
 * Drop images into /public/proof/ and set `src` (e.g. "/proof/1.jpg").
 * Entries with an empty src show a placeholder frame.
 * Use real, verifiable screenshots only — always blur the channel name and other personal details.
 */
export const proofScreenshots: { src: string; caption: string }[] = [
  { src: "/proof/ypp-approval-email.jpg", caption: "Welcome to the YouTube Partner Program" },
  { src: "/proof/revenue-12k.jpg", caption: "$12,105 estimated revenue so far this year" },
  { src: "/proof/short-18m-views.jpg", caption: "One Short: 18M views and $4,139 revenue" },
  { src: "/proof/channel-15m-views.jpg", caption: "15.9M views in the last 90 days" },
  { src: "/proof/student-ypp-whatsapp.jpg", caption: "A student shares their YPP approval on WhatsApp" },
]

/**
 * TESTIMONIALS — DRAFTS. Before running ads, confirm with each student that:
 *  1. they are a real student whose channel was monetized, and
 *  2. they approve these words (edit them to match what they actually said).
 * Add their real timeline to `detail` (e.g. "Monetized in 7 weeks") only if it's true.
 * `photo` (/testimonials/name.jpg) and `screenshot` (blur the channel name!) are optional.
 */
export const testimonials: {
  name: string
  detail: string
  quote: string
  photo?: string
  screenshot?: string
}[] = [
  {
    name: "Daniel Ifeanyi",
    detail: "Faceless channel · Monetized",
    quote:
      "I had watched YouTube automation videos for almost a year and never posted anything. In the live class I picked my niche in the first week and published my first video before the class ended. When I got stuck after the class, Stanley was still there to answer me.",
  },
  {
    name: "Destiny Idowu",
    detail: "Started from zero · Monetized",
    quote:
      "I didn't even know how to edit a video. Everything was explained step by step, and because the classes were live, I could ask questions right there. The day I got the YouTube Partner Program email, he was one of the first people I told.",
  },
  {
    name: "Oluwapelumi Idowu",
    detail: "Restarted after a failed channel · Monetized",
    quote:
      "My first channel got flagged for reused content, and I almost gave up on YouTube. Stanley showed me how to use AI properly, so my videos were original. He looked at my analytics himself and told me exactly what to change. That's what made the difference.",
  },
]

export const formatPrice = (n: number) => `${funnel.currencySymbol}${n.toLocaleString("en-NG")}`
