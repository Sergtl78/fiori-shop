'use server'
import prisma from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const userSelect = {
  id: true,
  name: true,
  middleName: true,
  lastName: true,
  email: true,
  blocked: true,
  role: true,
  image: true,
  avatar: true,
  phone: true,
  tin: true,
  personalDiscount: true,
  shops: true,
  orders: true,
  createdAt: true,
  updatedAt: true
} satisfies Prisma.UserSelect

export type ResUser = Prisma.UserGetPayload<{
  select: typeof userSelect
}>

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: userSelect
  })
  return users
}

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    select: userSelect
  })
  return user
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    select: userSelect
  })
  return user
}

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  })
  revalidatePath('/', 'layout')
  return user
}

export const userUpdate = async ({
  userId,
  user
}: {
  userId: string
  user: Partial<User>
}) => {
  const data = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      ...user
    }
  })
  revalidatePath('/', 'layout')
  return data
}

export const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: {
      id
    }
  })
  revalidatePath('/', 'layout')
  return user
}

export const getUserShops = async (id: string) => {
  const shops = await prisma.shop.findMany({
    where: {
      userId: id
    }
  })
  return shops
}
export const removeUserShop = async (id: string) => {
  await prisma.shop.delete({
    where: {
      id
    }
  })
  revalidatePath('/', 'layout')
}
export const createUserShop = async ({
  userId,
  shop
}: {
  userId: string
  shop: Prisma.ShopCreateInput
}) => {
  const userShop = await prisma.shop.create({
    data: {
      ...shop,
      User: {
        connect: {
          id: userId
        }
      }
    }
  })
  revalidatePath('/', 'layout')
  return userShop
}
export const updateUserAvatar = async ({
  userId,
  urlAvatar
}: {
  userId: string
  urlAvatar: string
}) => {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      avatar: urlAvatar
    }
  })
  revalidatePath('/', 'layout')
}
