'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateConnectionFn {
  (T: string, U: string): Promise<void>
}

export const connectMainCategoryVsSubCategory = async (
  subCategoryId: string,
  mainCategoryId: string
) => {
  const res = await prisma.sub_category.update({
    where: {
      id: subCategoryId
    },
    data: {
      main_categoryId: mainCategoryId
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const connectCategoryVsSubCategory: UpdateConnectionFn = async (
  subCategoryId: string,
  categoryId: string
) => {
  const res = await prisma.sub_category.update({
    where: {
      id: subCategoryId
    },
    data: {
      categoryId: categoryId
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}

export const connectProductVsSubCategory: UpdateConnectionFn = async (
  subCategoryId: string,
  productId: string
) => {
  const res = await prisma.sub_category.update({
    where: {
      id: subCategoryId
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
