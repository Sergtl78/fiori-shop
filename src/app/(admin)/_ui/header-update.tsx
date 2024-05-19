'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { UpdateNameFn } from '../_lib/api/for-forms/changeNameFormItems'
import { UpdateSlugFn } from '../_lib/api/for-forms/changeSlugFormItems'
import { ChangeNameForm } from './form-items/change-name-form'
import { ChangeSlugForm } from './form-items/change-slug-form'

type Props = {
  data: {
    id: string
    name: string
    slug: string
  }
  changeNameFN: UpdateNameFn
  changeSlugFN: UpdateSlugFn
}

const HeaderUpdate = ({ data, changeNameFN, changeSlugFN }: Props) => {
  const [showName, setShowName] = useState(true)
  const [showSlug, setShowSlug] = useState(true)
  return (
    <div className='flex flex-col items-start gap-4'>
      <Card className='flex items-center gap-4'>
        <CardHeader>
          {showName ? (
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
          ) : (
            <ChangeNameForm
              title={data.name}
              id={data.id}
              setShowName={setShowName}
              changeNameFN={changeNameFN}
            />
          )}
        </CardHeader>
      </Card>
      <Card className='flex items-center gap-4'>
        <CardHeader>
          {showSlug ? (
            <div className='flex items-center gap-4'>
              <p>Slug</p>
              <h4>{data.slug}</h4>
              <Button
                onClick={() => setShowSlug(!showName)}
                variant={'ghost'}
                size={'icon'}
              >
                <Pencil2Icon className='w-6 h-6' />
              </Button>
            </div>
          ) : (
            <ChangeSlugForm
              setShowSlug={setShowSlug}
              title={data.slug}
              id={data.id}
              changeSlugFN={changeSlugFN}
            />
          )}
        </CardHeader>
      </Card>
    </div>
  )
}

export default HeaderUpdate
