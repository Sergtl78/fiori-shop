import { getUserByEmail } from '@/app/(website)/_lib/api/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import type { DefaultSession, NextAuthConfig, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from 'zod'

const prisma = new PrismaClient()

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
    user?: { role?: string } & User
  }
}
declare module 'next-auth' {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      role?: string
    } & DefaultSession['user']
  }
}

const googleConfig = Google({
  profile(profile) {
    return {
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      role: profile.role ?? 'USER'
    }
  },
  allowDangerousEmailAccountLinking: true
})
const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: {
      label: 'Email'
    },
    password: {
      label: 'Password',
      type: 'password'
    }
  },
  authorize: async credentials => {
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(6) })
      .safeParse(credentials)

    if (parsedCredentials.success) {
      const { email, password: passwordCredentials } = parsedCredentials.data

      const user = await getUserByEmail(email)
      console.log('user', user)
      if (!user) {
        throw new Error('User name or password is not correct')
      }
      if (!credentials?.password)
        throw new Error('Please Provide Your Password')
      //if (!user.password) throw new Error('Please Provide Your Password')
      // check if password is correct
      if (!user.password) throw new Error('Please Provide Your Password')
      const isPasswordCorrect = await bcrypt.compare(
        passwordCredentials,
        user.password
      )

      if (!isPasswordCorrect)
        throw new Error('User name or password is not correct')

      const { password, ...userWithoutPass } = user
      return userWithoutPass
    }
    return null
  }
})

const config = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET || 'any random string',
  session: { strategy: 'jwt' },

  providers: [googleConfig, credentialsConfig],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === '/middlewareProtected') return !!auth
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user

        token.user.role = user.role
      }
      return token
    },
    session({ session, token }) {
      session.user.role = token.user?.role
      return session
    }
  }
} satisfies NextAuthConfig

export const providerMap = config.providers.map(provider => {
  return { id: provider.id, name: provider.name }
})

export const { handlers, auth, signIn, signOut } = NextAuth(config)
