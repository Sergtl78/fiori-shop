'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateConnectionFn {
  (T: string, U: string): Promise<void>
}

export const connectProductVsColor: UpdateConnectionFn = async (
  colorId: string,
  productId: string
) => {
  const res = await prisma.color.update({
    where: {
      id: colorId
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
