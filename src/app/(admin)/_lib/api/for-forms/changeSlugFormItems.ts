'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateSlugFn {
  (id: string, slug: string): Promise<void>
}

export const changeSlugMainCategory: UpdateSlugFn = async (
  id: string,
  slug: string
) => {
  const res = await prisma.main_category.update({
    where: {
      id
    },
    data: {
      slug
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
export const changeSlugCategory: UpdateSlugFn = async (
  id: string,
  slug: string
) => {
  const res = await prisma.category.update({
    where: {
      id
    },
    data: {
      slug
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
export const changeSlugSubCategory: UpdateSlugFn = async (
  id: string,
  slug: string
) => {
  const res = await prisma.sub_category.update({
    where: {
      id
    },
    data: {
      slug
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const changeSlugProduct: UpdateSlugFn = async (
  id: string,
  slug: string
) => {
  const res = await prisma.product.update({
    where: {
      id
    },
    data: {
      slug
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
export const changeSlugColor: UpdateSlugFn = async (
  id: string,
  slug: string
) => {
  const res = await prisma.color.update({
    where: {
      id
    },
    data: {
      slug
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const changeSlugVendor: UpdateSlugFn = async (
  id: string,
  slug: string
) => {
  const res = await prisma.vendor.update({
    where: {
      id
    },
    data: {
      slug
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const changeSlugCollection: UpdateSlugFn = async (
  id: string,
  slug: string
) => {
  await prisma.collection.update({
    where: {
      id
    },
    data: {
      slug
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
