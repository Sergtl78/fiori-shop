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
import { Dispatch, SetStateAction } from 'react'
import { ResCollection, updateCollection } from '../_lib/api/collection'

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
  discount: z
    .number()
    .default(0)
    .refine(value => value >= 0 && value <= 100, {
      message: 'Не более 100%'
    }),
  icon: z
    .string()
    .min(2, { message: 'Название минимум 2 символа.' })
    .max(100, { message: 'Название максимум 100 символов.' })
})
type CollectionUpdateFormProps = {
  collection: ResCollection
  setShowName: Dispatch<SetStateAction<boolean>>
}
export function CollectionUpdateForm({
  collection,
  setShowName
}: CollectionUpdateFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: collection.name,
      slug: collection.slug,
      discount: collection.discount ?? 0,
      icon: collection.icon ?? ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await updateCollection(data)
      setShowName(true)
      return toast({
        title: 'Коллекция успешно создана.',
        variant: 'success'
      })
    } catch (error) {
      console.log('error in createVendor', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось создать подкатегорию.'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <h3 className=''>Обновить коллекцию</h3>
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
              <FormDescription>Уникальный идентификатор</FormDescription>
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
                <Input type='number' placeholder='Скидка...' {...field} />
              </FormControl>
              <FormDescription>Размер скидки</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='icon'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url файла иконки</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Url...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  )
}
