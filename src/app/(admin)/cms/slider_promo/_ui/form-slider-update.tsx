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
import { Slider_promo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { updateSlider_promo } from '../_lib/api/slider_promo'
import FormImageSlider from './form-image-slider'

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
      message: 'Название минимум 2 символа.'
    })
    .max(100, {
      message: 'Название максимум 100 символов.'
    }),
  textColor: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(7, {
      message: 'Название максимум 7 символов.'
    }),
  url: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(100, {
      message: 'Название максимум 100 символов.'
    })
})

type SliderUpdateFormProps = {
  setIsShow: Dispatch<SetStateAction<boolean>>
  data: Slider_promo
}
export function SlideUpdateForm({ setIsShow, data }: SliderUpdateFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: data?.title || '',
      description: data.description || '',
      textColor: data.textColor || '#000000',
      url: data.url || ''
    }
  })

  async function onSubmit(dataSubmit: z.infer<typeof FormSchema>) {
    try {
      const res = await updateSlider_promo({
        id: data.id,
        data: dataSubmit
      })
      setIsShow(true)
      router.refresh()
      return toast({
        variant: 'success',
        title: 'Слайд обновлен.'
      })
    } catch (error) {
      console.log('error in createCategory', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось создать слайд.'
      })
    }
  }

  return (
    <section className='w-full grid grid-cols-2 gap-6'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <h3 className=''>Обновление слайда </h3>
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
                <FormLabel>Цвет текста</FormLabel>
                <FormControl>
                  <Input
                    type='color'
                    placeholder='...'
                    {...field}
                    className='w-20 h-10 rounded-full p-0 border-none ring-0 focus:ring-0'
                  />
                </FormControl>
                <FormDescription>Выберите цвет текста</FormDescription>
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
      <FormImageSlider slideId={data.id} slideImage={data.image} />
    </section>
  )
}
