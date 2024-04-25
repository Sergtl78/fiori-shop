'use server'
import prisma from '@/lib/prisma'
//import { productInclude } from './product'

export const getSlider_promo = async () => {
  const slider = await prisma.slider_promo.findMany()
  return slider
}
