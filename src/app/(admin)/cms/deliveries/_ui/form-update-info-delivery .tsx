'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { cn, formatDate } from '@/lib/utils'
import { Delivery } from '@prisma/client'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { updateDelivery } from '../_lib/api/deliveries'

const FormSchema = z.object({
  slug: z
    .string()
    .min(2, {
      message: 'Slug минимум 2 символа.'
    })
    .max(30, {
      message: 'Slug максимум 30 символов.'
    })
    .refine(value => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value ?? ''), {
      message: 'Slug может содержать только латинские буквы, цифры и дефис.'
    }),
  data: z.date()
})

type DeliveryFormProps = {
  delivery?: Delivery
}
export function UpdateInfoDeliveryForm({ delivery }: DeliveryFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slug: delivery?.slug || '',
      data: delivery?.dateDelivery || new Date(Date.now())
    }
  })

  async function onSubmit(dataSubmit: z.infer<typeof FormSchema>) {
    if (!delivery?.id) return

    try {
      const res = await updateDelivery({
        dataDelivery: {
          slug: dataSubmit.slug,
          dateDelivery: dataSubmit.data
        },
        deliveryId: delivery?.id
      })
      router.push(`/cms/deliveries/${dataSubmit.slug}`)
      return toast({
        title: 'Поставка успешно обновлена.',
        variant: 'success'
      })
    } catch (error) {
      console.log('error in createVendor', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось обновить поставку.'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <h3 className=''>Создание поставки</h3>
        <FormField
          control={form.control}
          name='data'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Дата доставки</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        formatDate(field.value)
                      ) : (
                        <span>Выберите дату</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Дата поставки.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='slug'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Уникальный идентификатор</FormLabel>
              <FormControl>
                <Input placeholder='Slug...' {...field} />
              </FormControl>
              <FormDescription>Уникальный идентификатор</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  )
}
