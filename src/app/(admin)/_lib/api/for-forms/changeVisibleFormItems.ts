'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateVisibleFn {
  (id: string, visible: boolean): Promise<void>
}

export const changeVisibleProduct: UpdateVisibleFn = async (
  id: string,
  visible: boolean
) => {
  await prisma.product.update({
    where: {
      id
    },
    data: {
      visible: visible
    }
  })
  revalidatePath('/(admin)/cms', 'layout')
}
