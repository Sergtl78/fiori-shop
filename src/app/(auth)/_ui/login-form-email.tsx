'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { IconEmail } from '@/components/icon'
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
import { useState } from 'react'
import { authenticateEmail } from '../_lib/actions'

const FormSchema = z.object({
  email: z
    .string()
    .min(3, {
      message: 'Email must be at least 3 characters.'
    })
    .email({ message: 'Wrong email' })
})

type LoginFormProps = {
  callbackUrl?: string
  errorAuth?: string
}
export function LoginEmailForm({ callbackUrl, errorAuth }: LoginFormProps) {
  const [loginError, setLoginError] = useState<string | undefined>()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const loginError = await authenticateEmail(data.email)
    setLoginError(loginError)
    console.log('loginError', loginError)

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-background p-4'>
          <code className='text-foreground'>
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-6 mb-6'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='my@email.com' {...field} className='' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!errorAuth && (
          <p className='text-red-500 bg-red-100 w-full'>{errorAuth}</p>
        )}
        {!!loginError && (
          <p className='bg-red-100 text-red-600 text-center p-2'>
            {loginError}
          </p>
        )}
        <Button
          variant={'outline_primary'}
          className='w-full cursor-pointer active:scale-y-95'
          type='submit'
        >
          Войдите с
          <IconEmail className='w-6 h-6 ml-2  text-primary stroke-1' />
        </Button>
      </form>
    </Form>
  )
}
