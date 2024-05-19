'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { UpdateConnectionFn } from './connectFormItemsVsMainCategory'

export const disconnectMainCategoryVsCategory: UpdateConnectionFn = async (
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
export const disconnectSubCategoryVsCategory: UpdateConnectionFn = async (
  categoryId: string,
  subCategoryId: string
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
export const disconnectProductVsCategory: UpdateConnectionFn = async (
  categoryId: string,
  productId: string
) => {
  await prisma.category.update({
    where: {
      id: categoryId
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
