'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { Dispatch, SetStateAction } from 'react'
import { UpdateSlugFn } from '../../_lib/api/for-forms/changeSlugFormItems'

const FormSchema = z.object({
  slug: z.string().min(2, {
    message: 'slug must be at least 2 characters.'
  })
})

type InputFormProps = {
  id: string
  title?: string
  changeSlugFN: UpdateSlugFn
  setShowSlug: Dispatch<SetStateAction<boolean>>
}
export function ChangeSlugForm({
  title,
  id,
  setShowSlug,
  changeSlugFN
}: InputFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slug: title
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await changeSlugFN(id, data.slug)
      setShowSlug(true)
      router.refresh()
      return toast({
        variant: 'success',
        title: 'Slug изменен'
      })
    } catch (error: any) {
      console.log(error)
      return toast({
        variant: 'destructive',
        title: 'Что-то пошло не так'
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full max-w-lg items-end gap-3'
      >
        <FormField
          control={form.control}
          name='slug'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder='Slug' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={'sm'} variant={'outline_primary'} type='submit'>
          Изменить
        </Button>
      </form>
    </Form>
  )
}
