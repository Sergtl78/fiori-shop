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
import Link from 'next/link'
import { useRef } from 'react'
import {
  createProduct,
  getProductByName,
  getProductBySlug
} from '../_lib/api/products'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(30, {
      message: 'Название максимум 30 символов.'
    })
    .refine(
      async name => {
        const mainCategory = await getProductByName(name)
        if (mainCategory) return false
        return true
      },
      {
        message: 'Slug уже существует.'
      }
    ),
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
    })
    .refine(
      async slug => {
        const category = await getProductBySlug(slug)
        if (category) return false
        return true
      },
      {
        message: 'Slug уже существует.'
      }
    ),
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

export function CreateProductForm() {
  const slugRef = useRef<string | undefined>()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: '0',
      growth: '0',
      quantity: '0',
      min_quantity: '0',
      imageName: ''
    }
  })
  const router = useRouter()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    slugRef.current = data.slug
    try {
      const res = await createProduct({
        ...data,
        price: Number(data.price),
        growth: Number(data.growth),
        quantity: Number(data.quantity),
        min_quantity: Number(data.min_quantity),
        slug: data.slug.toLowerCase(),
        description: data.description ?? ''
      })
      router.refresh()
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
    <section className='w-full  flex flex-col gap-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full  '>
          <h3 className=''>Создание товара</h3>
          <div className=' grid grid-cols-2 w-full gap-4'>
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
                    <FormDescription>Должно быть уникальным</FormDescription>
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
                    <FormDescription>Должно быть уникальным</FormDescription>
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
          </div>
          <Button type='submit'>Сохранить</Button>
        </form>
      </Form>
      <div className='w-full max-w-sm flex flex-col gap-4 '>
        <p>
          Нажмите кнопку Обновить, для перехода на страницу редактирования
          товара. Чтобы подключить категории и загруженные картинки.
        </p>
        <Button
          disabled={!slugRef.current}
          asChild
          className='w-fit self-end disabled:cursor-none'
        >
          <Link
            href={
              (slugRef.current && `/cms/products/${slugRef.current}`) ?? '#'
            }
          >
            Обновить
          </Link>
        </Button>
      </div>
    </section>
  )
}
