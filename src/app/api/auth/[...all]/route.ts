import { toNextJsHandler } from "better-auth/next-js"
import { auth } from "@/lib/auth/config"

// Export GET and POST handlers for all auth routes
export const { GET, POST } = toNextJsHandler(auth)
