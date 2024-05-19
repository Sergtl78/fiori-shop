'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createUserShop } from '@/app/(website)/_lib/api/user'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(30, {
      message: 'Название максимум 30 символов.'
    }),

  city: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(30, {
      message: 'Название максимум 30 символов.'
    }),
  street: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(30, {
      message: 'Название максимум 30 символов.'
    }),
  house: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(30, {
      message: 'Название максимум 30 символов.'
    })
})

export function CreateUserShopForm({ userId }: { userId: string }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      city: 'Нижний Новгород',
      street: '',
      house: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await createUserShop({
        userId,
        shop: data
      })
      router.refresh()
      return toast({
        variant: 'success',
        title: 'Магазин создан.'
      })
    } catch (error) {
      console.log('error in createUserShop', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось создать магазин .'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full  '>
        <div className='container flex w-full flex-col gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder='Название...' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Город</FormLabel>
                <FormControl>
                  <Input placeholder='Город...' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='street'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Улица</FormLabel>
                <FormControl>
                  <Input placeholder='Улица...' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='house'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Дом</FormLabel>
                <FormControl>
                  <Input placeholder='Дом...' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Сохранить</Button>
        </div>
      </form>
    </Form>
  )
}
