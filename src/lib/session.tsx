"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { SessionData } from "better-auth"

export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      try {
        const client = (await import("./auth/client")).default
        const sessionData = client.getSession()
        if (sessionData.data) {
          setSession(sessionData.data)
        } else {
          router.push("/sign-in")
        }
      } catch (error) {
        console.error("Session check error:", error)
        router.push("/sign-in")
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [router])

  return { session, isLoading }
}
