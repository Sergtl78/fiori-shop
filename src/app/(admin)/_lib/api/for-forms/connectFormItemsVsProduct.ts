'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateConnectionFn {
  (T: string, U: string): Promise<void>
}

export const connectMainCategoryVsProduct = async (
  productId: string,
  mainCategoryId: string
) => {
  const res = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      main_categoryId: mainCategoryId
    }
  })
  revalidatePath('/cms/products')
}
export const connectCategoryVsProduct = async (
  productId: string,
  categoryId: string
) => {
  const res = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      categoryId: categoryId
    }
  })
  revalidatePath('/cms/products')
}

export const connectSubCategoryVsProduct = async (
  productId: string,
  sub_categoryId: string
) => {
  const res = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      sub_categoryId: sub_categoryId
    }
  })

  revalidatePath('/cms/products')
}

export const connectVendorVsProduct = async (
  productId: string,
  vendorId: string
) => {
  const res = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      vendorId: vendorId
    }
  })
  revalidatePath('/cms/products')
}

export const connectColorVsProduct = async (
  productId: string,
  colorId: string
) => {
  const res = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      colorId: colorId
    }
  })
  revalidatePath('/cms/products')
}

export const connectImageVsProduct = async (
  productId: string,
  imageId: string
) => {
  const res = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      images: {
        connect: {
          id: imageId
        }
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
