import { betterAuth } from "better-auth"
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2"
import { nextCookies } from "better-auth/next-js"
import { db } from "@/db/db"
import * as schema from "@/db/schema"

// Configure Better Auth with GitHub OAuth
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    // Provide your Drizzle ORM instance here
    provider: "pg",
    schema,
  }),

  // GitHub OAuth provider
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },

  // Advanced settings
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  plugins: [nextCookies()],
})

// Export types for TypeScript support
export type Session = typeof auth.$Infer.Session
