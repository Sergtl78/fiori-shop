'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { UpdateConnectionFn } from './connectFormItemsVsMainCategory'

export const disconnectCategoryVsMainCategory: UpdateConnectionFn = async (
  mainCategoryId: string,
  categoryId: string
) => {
  await prisma.main_category.update({
    where: {
      id: mainCategoryId
    },
    data: {
      categories: {
        disconnect: {
          id: categoryId
        }
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
export const disconnectSubCategoryVsMainCategory: UpdateConnectionFn = async (
  mainCategoryId: string,
  subCategoryId: string
) => {
  await prisma.main_category.update({
    where: {
      id: mainCategoryId
    },
    data: {
      sub_categories: {
        disconnect: {
          id: subCategoryId
        }
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
export const disconnectProductVsMainCategory: UpdateConnectionFn = async (
  mainCategoryId: string,
  productId: string
) => {
  await prisma.main_category.update({
    where: {
      id: mainCategoryId
    },
    data: {
      products: {
        disconnect: {
          id: productId
        }
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
