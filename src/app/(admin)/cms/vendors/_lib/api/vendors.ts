'use server'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const vendorInclude = {
  products: {
    select: { name: true, slug: true, id: true },
    orderBy: { name: 'asc' }
  }
} satisfies Prisma.VendorInclude

export type ResVendor = Prisma.VendorGetPayload<{
  include: typeof vendorInclude
}> & {
  createdAtFormatted?: string
  updatedAtFormatted?: string
}
export const getVendorsAdmin = async (): Promise<ResVendor[]> => {
  const res = await prisma.vendor.findMany({
    include: vendorInclude,
    orderBy: { name: 'asc' }
  })
  const vendors = res.map(vendor => {
    return {
      ...vendor,
      createdAtFormatted: formatDate(vendor.createdAt),
      updatedAtFormatted: formatDate(vendor.updatedAt)
    }
  })

  return vendors
}
export const getVendorBySlug = async (slug: string) => {
  const res = await prisma.vendor.findUnique({
    where: {
      slug
    },
    include: vendorInclude
  })
  return res
}
export const getVendorByName = async (name: string) => {
  const res = await prisma.vendor.findUnique({
    where: {
      name
    }
  })
  return res
}

export const createVendor = async ({
  name,
  slug
}: {
  name: string
  slug: string
}) => {
  const res = await prisma.vendor.create({
    data: {
      name,
      slug
    }
  })
  revalidatePath('/', 'layout')
}
export const deleteVendor = async (ids: string[]) => {
  const res = await prisma.vendor.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/', 'layout')
}
