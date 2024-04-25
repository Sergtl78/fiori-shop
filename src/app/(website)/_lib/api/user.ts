'use server'
import { User } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export const getUsers = async () => {
  const users = await prisma.user.findMany()
  return users
}

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  return user
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
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
  return user
}

export const updateUser = async (id: string, user: Partial<User>) => {
  const data = await prisma.user.update({
    where: {
      id
    },
    data: {
      ...user
    }
  })
  return data
}

export const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: {
      id
    }
  })
  return user
}
