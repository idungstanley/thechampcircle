import "server-only"
import { headers } from "next/headers"
import { marketFor } from "@/lib/pricing"

/** The visitor's market from Vercel's IP-country header. DEV_COUNTRY overrides it for local testing. */
export async function requestMarket() {
  return marketFor((await headers()).get("x-vercel-ip-country") ?? process.env.DEV_COUNTRY)
}
