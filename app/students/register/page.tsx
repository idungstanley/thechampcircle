import type { Metadata } from "next"
import { RegisterView } from "@/app/register/register-view"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Reserve your student seat — The Champ Circle",
  robots: { index: false, follow: false },
}

export default function StudentRegisterPage() {
  return <RegisterView plan="student" />
}
