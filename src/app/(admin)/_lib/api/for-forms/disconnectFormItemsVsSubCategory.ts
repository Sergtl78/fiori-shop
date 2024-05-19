'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { UpdateConnectionFn } from './connectFormItemsVsMainCategory'

export const disconnectMainCategoryVsSubCategory: UpdateConnectionFn = async (
  mainCategoryId: string,
  subCategoryId: string
) => {
  await prisma.main_category.update({
    where: {
      id: mainCategoryId
    },
    data: {
      categories: {
        disconnect: {
          id: subCategoryId
        }
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
export const disconnectCategoryVsSubCategory: UpdateConnectionFn = async (
  subCategoryId: string,
  categoryId: string
) => {
  await prisma.category.update({
    where: {
      id: categoryId
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
export const disconnectProductVsSubCategory: UpdateConnectionFn = async (
  subCategoryId: string,
  productId: string
) => {
  await prisma.sub_category.update({
    where: {
      id: subCategoryId
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
