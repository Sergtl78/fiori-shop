'use client'

import { ResProduct } from '@/lib/api/product'
import { AddCartIcon } from '../icon/AddCart'
import { Button } from '../ui/button'

type ButtonAddCartProps = {
  product: ResProduct
}

export default function ButtonAddCart({ product }: ButtonAddCartProps) {
  return (
    <div>
      <Button variant='default' className='hover:scale-105' onClick={() => {}}>
        <AddCartIcon className='h-6 w-6 fill-primary-foreground ' />
      </Button>
    </div>
  )
}
