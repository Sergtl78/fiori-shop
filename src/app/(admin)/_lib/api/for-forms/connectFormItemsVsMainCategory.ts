'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateConnectionFn {
  (T: string, U: string): Promise<void>
}

export const connectCategoryVsMainCategory: UpdateConnectionFn = async (
  mainCategoryId: string,
  categoryId: string
) => {
  const res = await prisma.main_category.update({
    where: {
      id: mainCategoryId
    },
    data: {
      categories: {
        connect: {
          id: categoryId
        }
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const connectSubCategoryVsMainCategory: UpdateConnectionFn = async (
  mainCategoryId: string,
  subCategoryId: string
) => {
  const res = await prisma.main_category.update({
    where: {
      id: mainCategoryId
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

export const connectProductVsMainCategory: UpdateConnectionFn = async (
  mainCategoryId: string,
  productId: string
) => {
  const res = await prisma.main_category.update({
    where: {
      id: mainCategoryId
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
