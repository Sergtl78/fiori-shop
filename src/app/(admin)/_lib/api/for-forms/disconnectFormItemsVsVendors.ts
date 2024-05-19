'use server'
import prisma from '@/lib/prisma'
import { UpdateConnectionFn } from './connectFormItemsVsMainCategory'
import { revalidatePath } from 'next/cache'

export const disconnectProductVsVendor: UpdateConnectionFn = async (
  vendorId: string,
  productId: string
) => {
  await prisma.vendor.update({
    where: {
      id: vendorId
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
