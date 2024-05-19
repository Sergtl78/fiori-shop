'use server'
import prisma from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'

const userInclude = {
  shops: { select: { name: true, id: true } }
} satisfies Prisma.UserInclude
export type ResCustomer = Prisma.UserGetPayload<{
  include: typeof userInclude
}> & {
  userShop?: string
}

export const getNewUsers = async (): Promise<User[]> => {
  const newUsers = await prisma.user.findMany({
    where: {
      role: 'NEW'
    }
  })
  return newUsers
}
