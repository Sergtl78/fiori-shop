'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const changeRoleNewToUser = async (userId: string) => {
  const res = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role: 'USER'
    }
  })
  revalidatePath('/(admin)/crm', 'layout')
}
export const changeRoleNewToNew = async (userId: string) => {
  const res = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role: 'NEW'
    }
  })
  revalidatePath('/(admin)/crm', 'layout')
}
export const changeRoleUserToManager = async (userEmail: string) => {
  const res = await prisma.user.update({
    where: {
      email: userEmail
    },
    data: {
      role: 'MANAGER'
    }
  })

  revalidatePath('/(admin)/crm', 'layout')
}
export const changeRoleUserToAdmin = async (userEmail: string) => {
  const res = await prisma.user.update({
    where: {
      email: userEmail
    },
    data: {
      role: 'ADMIN'
    }
  })
  revalidatePath('/(admin)/crm', 'layout')
}
