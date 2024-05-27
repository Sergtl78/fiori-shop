'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import slug from 'slug'
import * as XLSX from 'xlsx'
export type FormState = {
  status: string
  message: string
} | null

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
  hex: string
}
export async function actionProductsCreate(
  initialState: FormState,
  formData: FormData
) {
  const file = formData.get('file') as File | null
  console.log(file)
  if (file === null) {
    return { status: 'error', message: 'Выберите файл.' }
  }

  if (
    file.type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
    file.type !== 'application/vnd.ms-excel'
  ) {
    return { status: 'error', message: 'Формат файла не поддерживается.' }
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const worksheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[worksheetName]
  const data = XLSX.utils.sheet_to_json(worksheet) as Array<ResProductsCreate>

  return await createProducts(data)
}

async function createProducts(data: ResProductsCreate[]) {
  try {
    const res = await prisma.$transaction(
      data.map(product => {
        return prisma.product.upsert({
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

            Main_category: {
              connectOrCreate: {
                where: {
                  name: product.main_category
                },
                create: {
                  name: product.main_category,
                  slug: slug(product.main_category, {
                    lower: true,
                    replacement: '-'
                  }),
                  categories: {
                    connectOrCreate: {
                      where: {
                        name: product.category
                      },
                      create: {
                        name: product.category,
                        slug: slug(product.category, {
                          lower: true,
                          replacement: '-'
                        })
                      }
                    }
                  }
                }
              }
            },
            Category: {
              connectOrCreate: {
                where: {
                  name: product.category
                },
                create: {
                  name: product.category,
                  slug: slug(product.category, {
                    lower: true,
                    replacement: '-'
                  }),

                  sub_categories: {
                    connectOrCreate: {
                      where: {
                        name: product.sub_category
                      },
                      create: {
                        name: product.sub_category,
                        slug: slug(product.sub_category, {
                          lower: true,
                          replacement: '-'
                        })
                      }
                    }
                  }
                }
              }
            },
            Sub_category: {
              connectOrCreate: {
                where: {
                  name: product.sub_category
                },
                create: {
                  name: product.sub_category,
                  slug: slug(product.sub_category, {
                    lower: true,
                    replacement: '-'
                  })
                }
              }
            },
            Vendor: {
              connectOrCreate: {
                where: {
                  name: product.vendor
                },
                create: {
                  name: product.vendor,
                  slug: slug(product.vendor, { lower: true, replacement: '-' })
                }
              }
            },
            Color: {
              connectOrCreate: {
                where: {
                  name: product.color
                },
                create: {
                  name: product.color,
                  slug: slug(product.color, { lower: true, replacement: '-' }),
                  hex: product.hex
                }
              }
            }
          },
          update: {
            name: product.name,
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
      })
    )
    revalidatePath('/', 'layout')
    return { status: 'success', message: 'Товары добавлены', data: res }
  } catch (error) {
    console.log('createProducts error', error)
    return { status: 'error', message: 'Не удалось создать товары' }
  }
}
