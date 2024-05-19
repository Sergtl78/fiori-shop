'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { ResColor } from '../cms/colors/_lib/api/color'
import { ColorUpdateForm } from '../cms/colors/_ui/form-color-update'

type Props = {
  data: ResColor
}

const HeaderUpdateColor = ({ data }: Props) => {
  const [showName, setShowName] = useState(true)
  return (
    <div className='flex flex-col w-full max-w-sm items-start gap-4'>
      <Card className='flex items-center w-full gap-4'>
        <CardHeader>
          {showName ? (
            <div className='flex items-center gap-4'>
              <p>Название</p>
              <h2 className='pb-0'>{data.name}</h2>
              <div
                className='w-10 h-10 rounded-full border '
                style={{ backgroundColor: data.hex }}
              ></div>
              <Button
                onClick={() => setShowName(!showName)}
                variant={'ghost'}
                size={'icon'}
              >
                <Pencil2Icon className='w-6 h-6' />
              </Button>
            </div>
          ) : (
            <ColorUpdateForm color={data} setShowName={setShowName} />
          )}
        </CardHeader>
      </Card>
    </div>
  )
}

export default HeaderUpdateColor
