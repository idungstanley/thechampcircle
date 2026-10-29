"use client"

import { useEffect, useState } from "react"
import { Download, Share2 } from "lucide-react"
import { funnel } from "@/lib/funnel-config"
import { track } from "@/lib/track"

/** Fires the Meta "Purchase" event once per verified payment reference. */
export function PurchaseEvent({ reference, amount }: { reference: string; amount: number }) {
  useEffect(() => {
    const key = `champ-purchase-${reference}`
    try {
      if (localStorage.getItem(key)) return
      localStorage.setItem(key, "1")
    } catch {}
    track("Purchase", { value: amount, currency: funnel.currency, content_name: funnel.programName })
  }, [reference, amount])
  return null
}

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")

export function CalendarButtons() {
  const start = new Date(funnel.classStart)
  const end = new Date(start.getTime() + 90 * 60_000)
  const title = `${funnel.brand} — Live Class 1`
  const details = "First live class of The Champ Circle YouTube Automation + AI program. The class link is shared in the student group."

  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${stamp(start)}/${stamp(end)}&details=${encodeURIComponent(details)}`

  function downloadIcs() {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//The Champ Circle//Class//EN",
      "BEGIN:VEVENT",
      `UID:champ-class-1-${stamp(start)}@thechampcircle`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${details}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT1H",
      "ACTION:DISPLAY",
      "DESCRIPTION:Class starts in 1 hour",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }))
    const a = Object.assign(document.createElement("a"), { href: url, download: "champ-circle-class-1.ics" })
    a.click()
    URL.revokeObjectURL(url)
  }

  const btn = "inline-flex items-center justify-center gap-2 rounded-full border-2 border-champ-black px-5 py-2.5 text-sm font-bold text-champ-black"
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      <a href={google} target="_blank" rel="noopener noreferrer" className={btn}>
        Google Calendar
      </a>
      <button type="button" onClick={downloadIcs} className={btn}>
        <Download className="size-4" aria-hidden /> Apple / Outlook
      </button>
    </div>
  )
}

export function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = window.location.origin
    const text = "I just joined The Champ Circle live YouTube Automation class. Early price ends soon — join me:"
    if (navigator.share) {
      try {
        await navigator.share({ title: funnel.brand, text, url })
        return
      } catch {
        return
      }
    }
    await navigator.clipboard?.writeText(`${text} ${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <button
      type="button"
      onClick={share}
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-champ-black px-7 py-3.5 font-bold text-champ-yellow"
    >
      <Share2 className="size-5" aria-hidden /> {copied ? "Link copied!" : "Share with a friend"}
    </button>
  )
}
