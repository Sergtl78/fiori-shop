'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface UpdateConnectionFn {
  (T: string, U: string): Promise<void>
}

export const connectProductVsVendor: UpdateConnectionFn = async (
  vendorId: string,
  productId: string
) => {
  const res = await prisma.vendor.update({
    where: {
      id: vendorId
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
