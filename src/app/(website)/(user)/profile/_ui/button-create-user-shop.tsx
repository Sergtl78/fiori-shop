'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { CreateUserShopForm } from './form-user-shop-create'

type Props = {
  userId: string
}

const ButtonCreateUserShop = ({ userId }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>+ Добавить магазин</Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm w-[90vw] rounded-lg flex flex-col'>
        <DialogHeader>
          <DialogTitle>Добавить магазин</DialogTitle>
        </DialogHeader>
        <CreateUserShopForm userId={userId} />
      </DialogContent>
    </Dialog>
  )
}

export default ButtonCreateUserShop
