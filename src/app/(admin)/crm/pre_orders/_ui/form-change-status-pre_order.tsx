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
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { Status } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { changePre_orderStatus } from '../_lib/api/pre_orders'

const FormSchema = z.object({
  status: z.enum(
    [
      Status.NEW,
      Status.CONFIRMED,
      Status.PAID,
      Status.PENDING,
      Status.FULFILLED,
      Status.CANCELLED
    ],
    { required_error: 'Status is required' }
  )
})

type FormProps = {
  pre_orderId: string
  statusPre_order: Status
}
export function ChangeStatusPre_orderForm({
  pre_orderId,
  statusPre_order
}: FormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: statusPre_order
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await changePre_orderStatus({
        pre_orderId,
        status: data.status
      })
      toast({
        title: 'Статус изменен',
        variant: 'success'
      })
      router.refresh()
    } catch (error) {
      console.log('error in changeOrderStatus', error)
      return toast({
        title: 'Не удалось изменить статус',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите статус' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='NEW'>Новый</SelectItem>

                  <SelectItem value='CONFIRMED'>Подтвержден</SelectItem>
                  <SelectItem value='PAID'>Оплачен</SelectItem>
                  <SelectItem value='PENDING'>В работе</SelectItem>
                  <SelectItem value='FULFILLED'>Выполнен</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  )
}
