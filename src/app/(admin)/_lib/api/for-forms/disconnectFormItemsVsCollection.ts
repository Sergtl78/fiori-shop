'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { UpdateConnectionFn } from './connectFormItemsVsMainCategory'

export const disconnectProductVsCollection: UpdateConnectionFn = async (
  collectionId: string,
  productId: string
) => {
  await prisma.collection.update({
    where: {
      id: collectionId
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
