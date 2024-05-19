'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateConnectionFn {
  (T: string, U: string): Promise<void>
}

export const connectProductVsCollection: UpdateConnectionFn = async (
  collectionId: string,
  productId: string
) => {
  const res = await prisma.collection.update({
    where: {
      id: collectionId
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
