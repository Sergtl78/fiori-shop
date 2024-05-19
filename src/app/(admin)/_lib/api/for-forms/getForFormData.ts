import prisma from '@/lib/prisma'

export const getMainCategoriesForm = async () => {
  const res = await prisma.main_category.findMany({
    select: {
      id: true,
      name: true,
      slug: true
    }
  })
  return res
}

export const getCategoriesForm = async () => {
  const res = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true
    }
  })
  return res
}
export const getSubCategoriesForm = async () => {
  const res = await prisma.sub_category.findMany({
    select: {
      id: true,
      name: true,
      slug: true
    }
  })
  return res
}
export const getProductsForm = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true
    }
  })
  return res
}
export const getColorsForm = async () => {
  const res = await prisma.color.findMany({
    select: {
      id: true,
      name: true,
      slug: true
    }
  })
  return res
}
export const getVendorsForm = async () => {
  const res = await prisma.vendor.findMany({
    select: {
      id: true,
      name: true,
      slug: true
    }
  })
  return res
}
export const getCollectionsForm = async () => {
  const res = await prisma.collection.findMany({
    select: {
      id: true,
      name: true,
      slug: true
    }
  })
  return res
}
export const getUsersForm = async () => {
  const res = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  })
  return res
}
export const getUserShopsForm = async () => {
  const res = await prisma.shop.findMany({
    select: {
      id: true,
      name: true
    }
  })
  return res
}
