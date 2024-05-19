'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { productInclude } from './result-types'

const collectionsInclude = {
  products: {
    include: productInclude,
    where: {
      visible: true
    }
  }
} satisfies Prisma.CollectionInclude

export type ResCollections = Prisma.CollectionGetPayload<{
  include: typeof collectionsInclude
}>

type GetCollectionsProps = {
  collectionsSlugs?: string[]
}
export const getCollections = async ({
  collectionsSlugs
}: GetCollectionsProps) => {
  const slugsOr = collectionsSlugs?.map(slug => {
    return { slug: slug }
  })
  const collections = await prisma.collection.findMany({
    where: {
      OR: slugsOr
    },
    include: collectionsInclude
  })
  return collections
}

const collectionInclude = {
  products: {
    include: productInclude
  }
} satisfies Prisma.CollectionSelect

export type ResCollectionBySlug = Prisma.CollectionGetPayload<{
  include: typeof collectionsInclude
}>

export const getCollectionBySlug = async (slug: string) => {
  const collection = await prisma.collection.findFirst({
    where: {
      slug: slug
    },
    include: collectionInclude
  })

  return collection
}
