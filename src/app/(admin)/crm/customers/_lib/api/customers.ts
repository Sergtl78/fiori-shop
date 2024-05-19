'use server'
import { UpdateVisibleFn } from '@/app/(admin)/_lib/api/for-forms/changeVisibleFormItems'
import prisma from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const userInclude = {
  shops: { select: { name: true, id: true } }
} satisfies Prisma.UserInclude
export type ResCustomer = Prisma.UserGetPayload<{
  include: typeof userInclude
}> & {
  userShop?: string
}
export const getCustomers = async (): Promise<ResCustomer[]> => {
  const res = await prisma.user.findMany({
    where: {
      role: 'USER'
    },
    include: userInclude
  })
  const customers: ResCustomer[] = res.map(user => {
    return {
      ...user,
      name: user.name + ' ' + (user.lastName || ''),
      userShop: user?.shops?.[0]?.name
    }
  })
  return customers
}

export const getManagers = async (): Promise<User[]> => {
  const managers = await prisma.user.findMany({
    where: {
      role: 'MANAGER'
    }
  })
  return managers
}

export const getNewUsers = async (): Promise<User[]> => {
  const newUsers = await prisma.user.findMany({
    where: {
      role: 'NEW'
    }
  })
  return newUsers
}

export const getAdmin = async (): Promise<User[]> => {
  const admins = await prisma.user.findMany({
    where: {
      role: 'ADMIN'
    }
  })
  return admins
}
export const deleteUsers = async (ids: string[]) => {
  const res = await prisma.user.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/crm/customers', 'layout')
}
export const changeBlockUser: UpdateVisibleFn = async (
  id: string,
  blocked: boolean
) => {
  await prisma.user.update({
    where: {
      id
    },
    data: {
      blocked
    }
  })
  revalidatePath('/crm/customers', 'layout')
}
