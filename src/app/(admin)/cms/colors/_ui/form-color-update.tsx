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
import { ResColor, updateColor } from '../_lib/api/color'
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
  hex: z
    .string()
    .min(2, {
      message: 'Название минимум 2 символа.'
    })
    .max(30, {
      message: 'Название максимум 7 символов.'
    })
})
type ColorUpdateFormProps = {
  color: ResColor
  setShowName: Dispatch<SetStateAction<boolean>>
}
export function ColorUpdateForm({ color, setShowName }: ColorUpdateFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: color.name,
      slug: color.slug,
      hex: color.hex
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await updateColor(data)
      setShowName(true)
     router.refresh()
      return toast({
        title: 'Цвет успешно создана.',
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
        <h3 className=''>Обновить цвет</h3>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder='Название...' {...field} />
              </FormControl>
              <FormDescription>Название цвета.</FormDescription>
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
          name='hex'
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
        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  )
}
