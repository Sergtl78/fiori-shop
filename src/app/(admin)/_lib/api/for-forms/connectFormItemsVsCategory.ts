'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateConnectionFn {
  (T: string, U: string): Promise<void>
}

export const connectMainCategoryVsCategory = async (
  categoryId: string,
  mainCategoryId: string
) => {
  const res = await prisma.category.update({
    where: {
      id: categoryId
    },
    data: {
      main_categoryId: mainCategoryId
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const connectSubCategoryVsCategory: UpdateConnectionFn = async (
  categoryId: string,
  subCategoryId: string
) => {
  const res = await prisma.category.update({
    where: {
      id: categoryId
    },
    data: {
      sub_categories: {
        connect: {
          id: subCategoryId
        }
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const connectProductVsCategory: UpdateConnectionFn = async (
  categoryId: string,
  productId: string
) => {
  const res = await prisma.category.update({
    where: {
      id: categoryId
    },
    data: {
      products: {
        connect: {
          id: productId
        }
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
