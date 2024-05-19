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
import {
  createMainCategory,
  getMainCategoryByName,
  getMainCategoryBySlug
} from '../_lib/api/main_categories'

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
        const mainCategory = await getMainCategoryByName(name)
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
        const mainCategory = await getMainCategoryBySlug(slug)
        if (mainCategory) return false
        return true
      },
      {
        message: 'Slug уже существует.'
      }
    )
})

export function MainCategoryForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      slug: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await createMainCategory(data)
    if (!res)
      toast({
        variant: 'destructive',
        title: 'Не удалось создать главную категорию.'
      })
    toast({
      variant: 'success',
      title: 'Главная категория создана:'
    })
    form.reset()
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <h3 className=''>Создание главной категории</h3>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder='Название...' {...field} />
              </FormControl>
              <FormDescription>Название главной категории.</FormDescription>
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
