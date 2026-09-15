"use client"

import { useState } from "react"
import { useSession, signIn, signOut } from "@/lib/auth/client"
import Image from "next/image"

export default function SignInPage() {
  const [isPending, setIsPending] = useState(false)

  async function signInWithGitHub() {
    setIsPending(true)
    try {
      await signIn.social({
        callbackURL: "/",
        provider: "github",
      })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsPending(false)
    }
  }

  async function handleSignOut() {
    try {
      await signOut()
      window.location.href = "/"
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  // Check if user is already signed in
  const session = useSession()
  if (session.data) {
    const user = session.data.user
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 px-4">
        <main className="w-full max-w-md text-center">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-600 opacity-75 blur-xl"></div>
              <img
                src={user.image || "/default-avatar.png"}
                alt={`${user.name}'s profile`}
                className="relative h-32 w-32 rounded-full border-4 border-white dark:border-zinc-800 object-cover"
              />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {user.name}
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              GitHub Member
            </p>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            disabled={isPending}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-8 py-3 font-medium text-white transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>

          {/* GitHub Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.924.43.312.833 1.123.833 2.246v2.868c0 .319.193.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Signed in with GitHub</span>
          </div>

          {/* Info text */}
          <p className="mt-6 text-sm text-zinc-400 dark:text-zinc-500">
            Secure sign-in powered by GitHub OAuth
          </p>
        </main>
      </div>
    )
  }

  // Sign in view (not logged in)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 px-4">
      <main className="w-full max-w-md text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 dark:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white dark:text-zinc-900"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.924.43.312.833 1.123.833 2.246v2.868c0 .319.193.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Video Blog Suggester
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Sign in with GitHub to access your personalized video blog
            recommendations
          </p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={signInWithGitHub}
          disabled={isPending}
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-zinc-900 px-8 py-4 font-medium text-white transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          <svg
            className="h-5 w-5 text-white dark:text-black"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.924.43.312.833 1.123.833 2.246v2.868c0 .319.193.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <span>Sign in with GitHub</span>
        </button>

        {/* Footer */}
        <p className="mt-8 text-sm text-zinc-400 dark:text-zinc-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </main>
    </div>
  )
}
