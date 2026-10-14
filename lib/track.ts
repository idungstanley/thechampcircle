type Fbq = (action: "track" | "trackCustom", event: string, params?: Record<string, unknown>) => void

/** Sends an event to the Meta Pixel if it's loaded. Safe to call anywhere on the client. */
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const fbq = (window as unknown as { fbq?: Fbq }).fbq
  fbq?.("track", event, params)
}
