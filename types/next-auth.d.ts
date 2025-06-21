import type { DefaultSession, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
  }
} 