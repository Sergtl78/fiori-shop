'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import slug from 'slug'
import * as XLSX from 'xlsx'
type ProductsCreateArs = {
  initialState: { message: string; status: string }
  formData: FormData
}
type ResProductsCreate = {
  name: string
  description: string
  image: string
  grow: number
  quantity: number
  min_quantity: number
  price: number
  main_category: string
  category: string
  sub_category: string
  vendor: string
  color: string
}
export const productsCreate = async ({
  initialState,
  formData
}: ProductsCreateArs) => {
  const files = formData.getAll('file') as File[]

  if (files.length === 0) {
    return { status: 'error', message: 'Please select a file.' }
  }
  const buffer = Buffer.from(await files[0].arrayBuffer())
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const worksheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[worksheetName]
  const data = XLSX.utils.sheet_to_json(worksheet) as Array<ResProductsCreate>
  console.log(data)

  for (let product of data) {
    const res = await prisma.product.upsert({
      where: {
        slug: slug(product.name, { lower: true, replacement: '-' })
      },
      create: {
        name: product.name,
        slug: slug(product.name, { lower: true, replacement: '-' }),
        description: product.description,
        growth: product.grow,
        quantity: product.quantity,
        min_quantity: product.min_quantity,
        price: product.price,

        Main_category: { connect: { slug: product.main_category } },
        Category: { connect: { slug: product.category } },
        Sub_category: { connect: { slug: product.sub_category } },
        Vendor: { connect: { slug: product.vendor } },
        Color: {
          connectOrCreate: {
            where: { slug: product.color },
            create: {
              name: product.color,
              slug: slug(product.color, { lower: true, replacement: '-' }),
              hex: '#000000'
            }
          }
        },
        images: {
          connectOrCreate: {
            where: { name: `${product.image}.webp` },
            create: {
              name: `${product.image}.webp`,
              url: `https://${process.env.YANDEX_CLOUD_BUCKET}.storage.yandexcloud.net/flowers/${product.image}.webp`
            }
          }
        }
      },
      update: {
        description: product.description,
        growth: product.grow,
        quantity: product.quantity,
        min_quantity: product.min_quantity,
        price: product.price,

        images: {
          connectOrCreate: {
            where: { name: `${product.image}.webp` },
            create: {
              name: `${product.image}.webp`,
              url: `https://${process.env.YANDEX_CLOUD_BUCKET}.storage.yandexcloud.net/flowers/${product.image}.webp`
            }
          }
        }
      }
    })
  }
  revalidatePath('/', 'layout')
  return {
    status: 'success',
    message: 'Товары успешно загружены'
  }
}
