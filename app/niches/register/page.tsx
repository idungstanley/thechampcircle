import type { Metadata } from "next"
import { RegisterView } from "@/app/register/register-view"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Get the Niche Pack — The Champ Circle",
  robots: { index: false, follow: false },
}

export default function NicheRegisterPage() {
  return <RegisterView plan="niche" />
}
