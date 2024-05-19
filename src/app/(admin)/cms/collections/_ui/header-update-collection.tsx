'use client'
import MediaImage from '@/components/media-Image'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { ResCollection } from '../_lib/api/collection'
import { CollectionUpdateForm } from './form-color-update'

type Props = {
  data: ResCollection
}

const HeaderUpdateCollection = ({ data }: Props) => {
  const [showName, setShowName] = useState(true)
  return (
    <div className='flex flex-col w-full max-w-sm items-start gap-4'>
      <Card className='flex items-center w-full gap-4'>
        <CardHeader>
          {showName ? (
            <div className='flex flex-col w-full items-start gap-4'>
              <div className='flex items-center justify-between  w-full gap-4'>
                <p>Название</p>
                <h4>{data.name}</h4>
                <Button
                  onClick={() => setShowName(!showName)}
                  variant={'ghost'}
                  size={'icon'}
                >
                  <Pencil2Icon className='w-6 h-6' />
                </Button>
              </div>
              <p>Slug: {data.slug}</p>
              <p>Скидка: {data.discount || 0} %</p>
              {data.icon && (
                <MediaImage
                  image={{
                    url: data.icon ?? '',
                    name: data.name
                  }}
                  className='w-12 h-12'
                />
              )}
            </div>
          ) : (
            <CollectionUpdateForm collection={data} setShowName={setShowName} />
          )}
        </CardHeader>
      </Card>
    </div>
  )
}

export default HeaderUpdateCollection
