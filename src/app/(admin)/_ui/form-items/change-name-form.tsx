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
import { UpdateNameFn } from '../../_lib/api/for-forms/changeNameFormItems'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
})

type InputFormProps = {
  id: string
  title?: string
  changeNameFN: UpdateNameFn
  setShowName: Dispatch<SetStateAction<boolean>>
}
export function ChangeNameForm({
  title,
  id,
  setShowName,
  changeNameFN
}: InputFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: title
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await changeNameFN(id, data.name)
      setShowName(true)
      router.refresh()
      return toast({
        variant: 'success',
        title: 'Название изменено'
      })
    } catch (error) {
      console.log(error)
      return toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Что-то пошло не так'
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={'outline_primary'} size={'sm'} type='submit'>
          Изменить
        </Button>
      </form>
    </Form>
  )
}
