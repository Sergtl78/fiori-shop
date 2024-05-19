'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { getProductsForDelivery } from '../_lib/api/deliveries'
import { ResDelivery_item } from '../_lib/api/delivery_items'
import { UpdateDelivery_itemForm } from './form-update-delivery_item'
type ProductsForForm = {
  id: string
  name: string
}
type Props = {
  delivery_item: ResDelivery_item
}
const ButtonUpdateDelivery_item = ({ delivery_item }: Props) => {
  const [products, setProducts] = useState<ProductsForForm[]>([])
  useEffect(() => {
    const getProducts = async () => {
      const res = await getProductsForDelivery()
      setProducts(res)
    }
    getProducts()
  }, [])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil2Icon className='w-4 h-4' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Обновить поставку</DialogTitle>
        </DialogHeader>
        <UpdateDelivery_itemForm
          products={products}
          delivery_item={delivery_item}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ButtonUpdateDelivery_item
