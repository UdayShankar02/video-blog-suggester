"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession as useBetterAuthSession } from "./auth/client"

export function useSession() {
  const router = useRouter()
  const { data: session, isPending } = useBetterAuthSession()

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in")
    }
  }, [session, isPending, router])

  return {
    session,
    isLoading: isPending,
  }
}
