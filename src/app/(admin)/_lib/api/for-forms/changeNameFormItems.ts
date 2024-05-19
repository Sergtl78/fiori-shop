'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateNameFn {
  (id: string, name: string): Promise<void>
}

export const changeNameMainCategory: UpdateNameFn = async (
  id: string,
  name: string
) => {
  const res = await prisma.main_category.update({
    where: {
      id
    },
    data: {
      name
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
export const changeNameCategory: UpdateNameFn = async (
  id: string,
  name: string
) => {
  const res = await prisma.category.update({
    where: {
      id
    },
    data: {
      name
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
export const changeNameSubCategory: UpdateNameFn = async (
  id: string,
  name: string
) => {
  const res = await prisma.sub_category.update({
    where: {
      id
    },
    data: {
      name
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const changeNameProduct: UpdateNameFn = async (
  id: string,
  name: string
) => {
  const res = await prisma.product.update({
    where: {
      id
    },
    data: {
      name
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
export const changeNameColor: UpdateNameFn = async (
  id: string,
  name: string
) => {
  const res = await prisma.color.update({
    where: {
      id
    },
    data: {
      name
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const changeNameVendor: UpdateNameFn = async (
  id: string,
  name: string
) => {
  const res = await prisma.vendor.update({
    where: {
      id
    },
    data: {
      name
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const changeNameCollection: UpdateNameFn = async (
  id: string,
  name: string
) => {
  await prisma.collection.update({
    where: {
      id
    },
    data: {
      name
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
