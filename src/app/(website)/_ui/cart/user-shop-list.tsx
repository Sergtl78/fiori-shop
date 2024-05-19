'use client'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Shop } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '../../_lib/state/cart-state'

type Props = {
  shops: Shop[] | undefined
}

const UserShopList = ({ shops }: Props) => {
  const { data: session } = useSession()
  const setShop = useCartStore(state => state.serShopId)
  const shopId = useCartStore(state => state.shopId)
  const [activeId, serActiveId] = useState('')
  if (!shops) <Skeleton className='w-full h-10 rounded-lg' />
  return (
    <div className='flex w-full flex-col gap-2'>
      <h2 className='text-xl font-semibold'>Магазины</h2>
     
      {shops?.map(shop => (
        <Card
          key={shop.id}
          onClick={() => {
            setShop(shop.id)
            serActiveId(shop.id)
          }}
          className={cn(
            'w-full flex flex-col',
            activeId === shop.id && 'border-2 border-primary'
          )}
        >
          <CardHeader>
            {shop.name}
            <CardDescription>
              г. {shop.city} ул. {shop.street} д. {shop.house}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default UserShopList
