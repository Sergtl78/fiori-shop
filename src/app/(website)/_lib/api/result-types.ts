import { Prisma } from '@prisma/client'

export const productInclude = {
  collections: true,
  images: true,
  delivery_items: { orderBy: { dateDelivery_item: 'asc' }, include: { Delivery: true } },
  Main_category: { select: { slug: true, name: true } },
  Category: { select: { slug: true, name: true } },
  Sub_category: { select: { slug: true, name: true } }
} satisfies Prisma.ProductInclude

export type ResProductBySlug = Prisma.ProductGetPayload<{
  include: typeof productInclude
}>
