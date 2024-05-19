'use client'

import { removeUserShop } from '@/app/(website)/_lib/api/user'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { Shop } from '@prisma/client'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

type Props = {
  shop: Shop
}

const ShopCard = ({ shop }: Props) => {
  const router = useRouter()
  const handleRemove = async (id: string) => {
    try {
      const res = await removeUserShop(id)

      router.refresh()
      toast({ title: 'Магазин удален', variant: 'success' })
    } catch (error) {
      console.log('removeUserShop error', error)
      toast({ title: 'Не удалось удалить магазин', variant: 'destructive' })
    }
  }
  return (
    <Card key={shop.id} className='pb-4 relative flex w-full '>
      <CardContent>
        <CardHeader className='py-2'>{shop.name}</CardHeader>
        <CardDescription>
          г.{shop.city} ул. {shop.street} д.{shop.house}
        </CardDescription>
      </CardContent>
      <Button
        onClick={() => handleRemove(shop.id)}
        size={'icon'}
        variant={'ghost'}
        className='absolute top-0 right-0 '
      >
        <Cross1Icon className='w-4 h-4 hover:text-destructive' />
      </Button>
    </Card>
  )
}

export default ShopCard
