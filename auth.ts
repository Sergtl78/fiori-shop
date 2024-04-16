import { getUserByEmail } from '@/lib/api/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from 'zod'

const prisma = new PrismaClient()

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
    let user = null
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(6) })
      .safeParse(credentials)

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data
      //const pwHash = hashPassword(password)
      //console.log('pwHash', pwHash)

      const user = await getUserByEmail(email)
      console.log('user', user)

      if (!user) return null
      let passwordsMatch = false
      user.password
        ? (passwordsMatch = await bcrypt.compare(password, user.password))
        : (passwordsMatch = false)
      console.log('passwordsMatch', passwordsMatch)

      if (passwordsMatch) return user
    }

    // return user object with the their profile data
    console.log('Invalid credentials')
    return user
  }
})

const config = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET || 'any random string',
  session: { strategy: 'jwt' },
  providers: [Google, credentialsConfig],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === '/middlewareProtected') return !!auth
      return true
    }
  }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
