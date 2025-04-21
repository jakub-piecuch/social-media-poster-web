// src/auth.ts
import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import type { NextAuthOptions } from "next-auth"

// Define configuration for NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      // Request the necessary permissions for managing bot accounts
      authorization: {
        params: {
          scope: "email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts"
        }
      }
    })
  ],
  callbacks: {
    // This is called after a user successfully signs in
    async jwt({ token, account, profile }: { token: any; account: any; profile?: any }) {
      // If this is a sign-in from Facebook, save the access token
      if (account && account.provider === "facebook") {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        token.facebookId = profile?.id;
      }
      return token;
    },
    // The session callback is called whenever a session is checked
    async session({ session, token }: { session: any; token: any }) {
      // Add Facebook info to the session
      session.user.facebookId = token.facebookId as string;
      session.accessToken = token.accessToken as string;
      
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  }
}

// Export handlers and auth functions
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

// Add TypeScript declaration for extended session
declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      facebookId?: string
    }
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    facebookId?: string
  }
}