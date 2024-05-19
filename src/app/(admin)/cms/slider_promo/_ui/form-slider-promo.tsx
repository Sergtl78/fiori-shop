'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { createSlidePromo } from '../_lib/api/slider_promo'

const FormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(30, {
      message: 'Название максимум 30 символов.'
    }),
  description: z
    .string()
    .min(2, {
      message: 'Описание минимум 2 символа.'
    })
    .max(300, {
      message: 'Описание максимум 300 символов.'
    }),
  textColor: z.string(),
  url: z
    .string()
    .min(2, {
      message: 'Ссылка минимум 2 символа.'
    })
    .max(100, {
      message: 'Ссылка максимум 100 символов.'
    })
})

export function SlidePromoForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      textColor: '#000000',
      url: ''
    }
  })
  const router = useRouter()
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await createSlidePromo({
        ...data,
        image: '/slide-default.png'
      })
      router.refresh()
      return toast({
        variant: 'success',
        title: 'Слайд создан.'
      })
    } catch (error) {
      console.log('error in createCategory', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось создать слайд.'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <h3 className=''>Создание главного слайдера</h3>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input placeholder='Заголовок...' {...field} />
              </FormControl>
              <FormDescription>Заголовок слайда.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Input placeholder='Описание...' {...field} />
              </FormControl>
              <FormDescription>Описание акции</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='textColor'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цвет</FormLabel>
              <FormControl>
                <Input
                  type='color'
                  placeholder='...'
                  {...field}
                  className='w-20 h-10 rounded-full p-0 border-none ring-0 focus:ring-0'
                />
              </FormControl>
              <FormDescription>Выберите цвет</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка</FormLabel>
              <FormControl>
                <Input placeholder='Ссылка...' {...field} />
              </FormControl>
              <FormDescription>Ссылка на страницу</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  )
}
