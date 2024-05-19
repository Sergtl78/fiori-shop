'use server'
import prisma from '@/lib/prisma'
import { Prisma, Slider_promo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export type ResSliderPromo = Slider_promo
export const getSliderPromosAdmin = async (): Promise<ResSliderPromo[]> => {
  const res = await prisma.slider_promo.findMany({})

  return res
}

export const getSliderById = async (id: string) => {
  const res = await prisma.slider_promo.findUnique({
    where: {
      id
    }
  })
  return res
}
export const createSlidePromo = async (
  data: Prisma.Slider_promoCreateInput
) => {
  const res = await prisma.slider_promo.create({
    data: data
  })
  revalidatePath('/', 'layout')
  return res
}
export const updateSlider_promo = async ({
  id,
  data
}: {
  id: string
  data: Prisma.Slider_promoUpdateInput
}) => {
  const res = await prisma.slider_promo.update({
    where: {
      id
    },
    data
  })
  revalidatePath('/', 'layout')
}

export const deleteSlidePromo = async (ids: string[]) => {
  const res = await prisma.slider_promo.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  revalidatePath('/', 'layout')
}
