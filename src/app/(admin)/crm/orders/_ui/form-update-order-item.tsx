'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { CheckIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { updateOrderItemCrm } from '../_lib/api/order_items'
import { ResOrderTable } from '../_lib/api/orders'

const FormSchema = z.object({
  quantityProduct: z
    .string()
    .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' })
})
type FormProps = {
  orderItem: ResOrderTable['order_items'][0]
  setShow: Dispatch<SetStateAction<boolean>>
}
export function UpdateOrderItemForm({ orderItem, setShow }: FormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantityProduct: orderItem.quantityProduct.toString()
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await updateOrderItemCrm({
        itemId: orderItem.id,
        quantityItem: Number(data.quantityProduct)
      })
      setShow(false)
      toast({
        variant: 'success',
        title: 'Информация создана.'
      })
    } catch (error) {
      console.log('error in createCategory', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось обновить.'
      })
    }
    form.reset()
    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full  flex items-end space-x-2'
      >
        <p>уп. </p>
        <FormField
          control={form.control}
          name='quantityProduct'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} className='w-14 h-8 border-foreground' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p> Х {orderItem.Product?.min_quantity} шт.</p>
        <Button
          variant={'secondary'}
          size={'icon'}
          type='submit'
          className='w-8 h-8'
        >
          <CheckIcon className='w-6 h-6' />
        </Button>
      </form>
    </Form>
  )
}
