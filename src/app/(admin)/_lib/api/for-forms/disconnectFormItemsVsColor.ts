'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { UpdateConnectionFn } from './connectFormItemsVsMainCategory'

export const disconnectProductVsColor: UpdateConnectionFn = async (
  colorId: string,
  productId: string
) => {
  await prisma.color.update({
    where: {
      id: colorId
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
