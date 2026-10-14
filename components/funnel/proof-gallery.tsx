"use client"

import { useState } from "react"
import { ImageIcon, ZoomIn } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { proofScreenshots } from "@/lib/funnel-config"
import { CtaButton } from "./cta-button"

export function ProofGallery() {
  const [open, setOpen] = useState<number | null>(null)
  const active = open === null ? null : proofScreenshots[open]

  return (
    <section id="proof" className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">The evidence</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Real channels. Real monetization. Don't take my word for it.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            These are screenshots from channels I've built and students I've coached. Tap any image to see it full size.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {proofScreenshots.map((shot, i) => (
            <figure key={i} className="group w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <button
                type="button"
                onClick={() => shot.src && setOpen(i)}
                disabled={!shot.src}
                className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-champ-black text-left"
                aria-label={shot.src ? `View screenshot: ${shot.caption}` : undefined}
              >
                {shot.src ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={shot.src} alt={shot.caption} className="size-full object-contain transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
                    <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-champ-black/80 text-white">
                      <ZoomIn className="size-4" aria-hidden />
                    </span>
                  </>
                ) : (
                  <span className="flex size-full flex-col items-center justify-center gap-2 border-2 border-dashed border-input p-4 text-center text-xs text-muted-foreground">
                    <ImageIcon className="size-6" aria-hidden />
                    Add screenshot in /public/proof
                  </span>
                )}
              </button>
              <figcaption className="mt-2 text-sm font-medium">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CtaButton location="proof">I want results like these</CtaButton>
        </div>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-auto p-2 sm:p-3">
          <DialogTitle className="px-1 pt-1 text-base">{active?.caption}</DialogTitle>
          {active?.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.src} alt={active.caption} className="w-full rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
