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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { ResProductAdmin, updateProduct } from '../_lib/api/products'

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(30, {
      message: 'Название максимум 30 символов.'
    }),
  slug: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(30, {
      message: 'Название максимум 30 символов.'
    })
    .refine(value => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value ?? ''), {
      message: 'Slug может содержать только латинские буквы, цифры и дефис.'
    }),
  description: z.string().optional(),
  price: z
    .string()
    .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' }),
  growth: z
    .string()
    .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' }),
  quantity: z
    .string()
    .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' }),
  min_quantity: z
    .string()
    .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' }),
  imageName: z.string().optional()
})

type UpdateProductFormProps = {
  product: ResProductAdmin
  setShowName: Dispatch<SetStateAction<boolean>>
}
export function UpdateProductForm({
  product,
  setShowName
}: UpdateProductFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: product.name,
      slug: product.slug,
      description: product.description ?? '',
      price: product.price.toString(),
      growth: product.growth.toString(),
      quantity: product.quantity.toString(),
      min_quantity: product.min_quantity.toString(),
      imageName: ''
    }
  })
  const router = useRouter()
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await updateProduct({
        ...data,
        price: Number(data.price),
        growth: Number(data.growth),
        quantity: Number(data.quantity),
        min_quantity: Number(data.min_quantity),
        slug: data.slug.toLowerCase(),
        description: data.description ?? ''
      })
      router.refresh()
      setShowName(true)
      return toast({
        variant: 'success',
        title: 'Товар создан.'
      })
    } catch (error) {
      console.log('error in createProduct', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось создать товар.'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <h3 className=''>Редактировать товар</h3>
        <div className=' grid grid-cols-3 w-full gap-4'>
          <div className='w-full flex flex-col gap4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder='Название...' {...field} />
                  </FormControl>
                  <FormDescription>Название товара.</FormDescription>
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
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание товара</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Описание...' {...field} />
                  </FormControl>
                  <FormDescription>Описание товара</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='w-full flex flex-col gap4'>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена товара</FormLabel>
                  <FormControl>
                    <Input
                      //type='number'
                      placeholder='Цена...'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Цена товара</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='growth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Рост товара</FormLabel>
                  <FormControl>
                    <Input
                      //type='number'
                      placeholder='Рост...'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Рост товара</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Количество товара</FormLabel>
                  <FormControl>
                    <Input
                      //type='number'
                      placeholder='Количество...'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Количество товара</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='min_quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Минимальное количество </FormLabel>
                  <FormControl>
                    <Input
                      //type='number'
                      placeholder='Количество...'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Минимальное количество товара
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* images */}
          <div className='w-full flex flex-col gap4'>
            <FormField
              control={form.control}
              name='imageName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название изображения </FormLabel>
                  <FormControl>
                    <Input placeholder='Название...' {...field} />
                  </FormControl>
                  <FormDescription>Название изображения</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  )
}
