'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { authenticateCredentials } from '../_lib/actions'

const FormSchema = z.object({
  email: z
    .string()
    .min(3, {
      message: 'Email must be at least 3 characters.'
    })
    .email({ message: 'Wrong email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
})

type LoginFormProps = {
  callbackUrl?: string
  errorAuth?: string
}
export function LoginForm({ callbackUrl, errorAuth }: LoginFormProps) {
  const [loginError, setLoginError] = useState<string | undefined>()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const loginError = await authenticateCredentials(data)
    setLoginError(loginError)
    if (!loginError) {
      router.push(/* callbackUrl ?? */ '/')
    }
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
                <Input placeholder='my@email.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative h-full w-full'>
                  <Input
                    type={open ? 'text' : 'password'}
                    placeholder='password'
                    {...field}
                    className='w-full '
                  />
                  {open && (
                    <EyeOpenIcon
                      onClick={() => setOpen(!open)}
                      className='absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer'
                    />
                  )}
                  {!open && (
                    <EyeClosedIcon
                      onClick={() => setOpen(!open)}
                      className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!errorAuth && (
          <p className='text-red-500 bg-red-100 w-full'>Неверные данные</p>
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
          Войти
        </Button>
      </form>
    </Form>
  )
}
