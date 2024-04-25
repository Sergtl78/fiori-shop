import { Prisma } from '@prisma/client'

export const productInclude = {
  collections: true,
  images: true,
  Main_category: { select: { slug: true } },
  Category: { select: { slug: true } },
  Sub_category: { select: { slug: true } }
} satisfies Prisma.ProductInclude

export type ResProductBySlug = Prisma.ProductGetPayload<{
  include: typeof productInclude
}>
