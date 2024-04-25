'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { productInclude } from './result-types'
//import { productInclude } from './product'

const collectionsInclude = {
  products: {
    include: productInclude
  }
} satisfies Prisma.CollectionInclude

export type ResCollections = Prisma.CollectionGetPayload<{
  include: typeof collectionsInclude
}>

export const getCollections = async () => {
  const collections = await prisma.collection.findMany({
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
