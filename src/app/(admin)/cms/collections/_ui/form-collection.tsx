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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import {
  createCollection,
  getCollectionByName,
  getCollectionBySlug
} from '../_lib/api/collection'

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
        const mainCategory = await getCollectionByName(name)
        if (mainCategory) return false
        return true
      },
      {
        message: 'Название уже существует.'
      }
    ),
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
    })
    .refine(
      async slug => {
        const category = await getCollectionBySlug(slug)
        if (category) return false
        return true
      },
      {
        message: 'Slug уже существует.'
      }
    ),
  discount: z
    .string()
    .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' })
    .refine(value => Number(value) >= 0 && Number(value) <= 100, {
      message: 'Не более 100%'
    })
})

export function CollectionForm() {
  const slugRef = useRef<string | undefined>()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      slug: '',
      discount: '0'
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data)
    slugRef.current = data.slug
    try {
      const res = await createCollection({
        ...data,
        discount: Number(data.discount)
      })

      console.log('res', res)

      return toast({
        title: 'Коллекция успешно создана.',
        variant: 'success'
      })
    } catch (error) {
      console.log('error in createVendor', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось создать коллекцию.'
      })
    }
  }

  return (
    <section className='w-full flex flex-col'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <h3 className=''>Создание коллекции</h3>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder='Название...' {...field} />
                </FormControl>
                <FormDescription>Название коллекции.</FormDescription>
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
                <FormDescription>
                  Только латинские буквы, цифры и дефис.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='discount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Скидка</FormLabel>
                <FormControl>
                  <Input placeholder='Скидка...' {...field} />
                </FormControl>
                <FormDescription>Размер скидки</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Сохранить</Button>
        </form>
      </Form>
      <div className='w-full max-w-sm flex flex-col gap-4  mt-4'>
        <p>
          Нажмите кнопку Обновить, для перехода на страницу редактирования
          коллекции. Чтобы подключить товары к коллекции.
        </p>
        <Button
          type='button'
          disabled={!slugRef.current}
          asChild
          className='w-fit self-end '
        >
          <Link
            href={
              (slugRef.current && `/cms/collections/${slugRef.current}`) ?? '#'
            }
          >
            Обновить
          </Link>
        </Button>
      </div>
    </section>
  )
}
