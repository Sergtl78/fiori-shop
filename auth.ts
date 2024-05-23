import { sendVerificationRequest } from '@/lib/sendVerificationRequest'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import type { DefaultSession, NextAuthConfig, User } from 'next-auth'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import Vk from 'next-auth/providers/vk'
import Yandex from 'next-auth/providers/yandex'
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
    tin?: string | null
    blocked?: boolean | null
    avatar?: string | null
    personalDiscount?: number
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
      role: profile.role ?? 'NEW'
    }
  },
  allowDangerousEmailAccountLinking: true
})
const vkConfig = Vk({
  profile(profile) {
    return {
      name: profile.first_name,
      email: profile.email,
      image: profile.photo_100
    }
  },
  allowDangerousEmailAccountLinking: true
})

const yandexConfig = Yandex({
  profile(profile) {
    return {
      name: profile.first_name,
      email: profile.default_email,
      image: `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-retina-50`
    }
  },
  allowDangerousEmailAccountLinking: true
})

const resendConfig = Resend({
  // If your environment variable is named differently than default
  apiKey: process.env.AUTH_RESEND_KEY,
  from: 'info@devsergey.ru',
  sendVerificationRequest: sendVerificationRequest
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

      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })
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

  providers: [
    googleConfig,
    vkConfig,
    yandexConfig,
    credentialsConfig,
    resendConfig
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify_email'
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
        token.user.id = user.id
        token.user.tin = user.tin
        token.user.role = user.role
        token.user.blocked = user.blocked
        token.user.avatar = user.avatar
        token.user.personalDiscount = user.personalDiscount
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.user?.id || ''
      session.user.role = token.user?.role
      session.user.tin = token.user?.tin
      session.user.blocked = token.user?.blocked
      session.user.avatar = token.user?.avatar
      session.user.personalDiscount = token.user?.personalDiscount
      return session
    }
  }
} satisfies NextAuthConfig

export const providerMap = config.providers.map(provider => {
  return { id: provider.id, name: provider.name }
})

export const { handlers, auth, signIn, signOut } = NextAuth(config)
