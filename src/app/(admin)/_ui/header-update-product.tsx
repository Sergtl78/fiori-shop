'use client'
import CarouselProduct from '@/app/(website)/products/_ui/carousel/carousel-product'
import DescriptionProduct from '@/app/(website)/products/_ui/description-product'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { ResProductAdmin } from '../cms/products/_lib/api/products'
import { UpdateProductForm } from '../cms/products/_ui/form-product-update'

type Props = {
  data: ResProductAdmin
}

const HeaderUpdateProduct = ({ data }: Props) => {
  const [showName, setShowName] = useState(true)
  return (
    <div className='flex flex-col w-full  items-start gap-4'>
      <Card className='flex items-center w-full gap-4'>
        <CardHeader className='w-full'>
          {showName ? (
            <div className='flex items-center gap-6'>
              <div className='max-w-sm'>
                <CarouselProduct slides={data.images ?? []} />
              </div>
              <div className='flex flex-col items-start gap-4'>
                <div className='flex items-center gap-4'>
                  <p>Название</p>
                  <h2>{data.name}</h2>
                  <Button
                    onClick={() => setShowName(!showName)}
                    variant={'ghost'}
                    size={'icon'}
                  >
                    <Pencil2Icon className='w-6 h-6' />
                  </Button>
                </div>
                <div className='flex flex-col  max-w-lg'>
                  <p>Slug: {data.slug}</p>
                  <p>Главная категория: {data.Main_category?.name}</p>
                  <p>Категория: {data.Category?.name}</p>
                  <p>Подкатегория: {data.Sub_category?.name}</p>
                  <p>Поставщик: {data.Vendor?.name}</p>
                  <div className='flex items-center gap-2'>
                    <p>Цвет: {data.Color?.name}</p>
                    <div
                      className='w-8 h-8 rounded-full'
                      style={{ backgroundColor: data.Color?.hex }}
                    />
                  </div>
                  <p>Рост: {data.growth} см</p>
                  <p>Количество: {data.quantity} шт.</p>
                  <p>В упаковке: {data.min_quantity} шт.</p>
                  <p>Цена: {formatPrice(data.price)}</p>
                  <DescriptionProduct description={data.description ?? ''} />
                </div>
              </div>
            </div>
          ) : (
            <UpdateProductForm product={data} setShowName={setShowName} />
          )}
        </CardHeader>
      </Card>
    </div>
  )
}

export default HeaderUpdateProduct
