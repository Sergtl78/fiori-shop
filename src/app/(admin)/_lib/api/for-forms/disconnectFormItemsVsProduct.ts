'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { UpdateConnectionFn } from './connectFormItemsVsMainCategory'

export const disconnectImageVsProduct: UpdateConnectionFn = async (
  productId: string,
  imageId: string
) => {
  await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      images: {
        disconnect: {
          id: imageId
        }
      }
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
