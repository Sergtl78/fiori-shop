'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import FormAvatar from '@/app/(admin)/cms/images/_ui/form-avatar'
import { logout } from '@/app/(auth)/_lib/actions'
import { ResUser, userUpdate } from '@/app/(website)/_lib/api/user'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { toast } from '@/components/ui/use-toast'
import { formatPhoneForInput, formatPhoneForSave } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Имя минимум 2 символа.'
    })
    .max(20, {
      message: 'Имя максимум 20 символов.'
    }),

  middleName: z
    .string()
    .min(2, {
      message: 'Отчество минимум 2 символа.'
    })
    .max(20, {
      message: 'Отчество максимум 20 символов.'
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Фамилия минимум 2 символа.'
    })
    .max(20, {
      message: 'Фамилия максимум 20 символов.'
    }),
  email: z
    .string()
    .min(6, {
      message: 'Email минимум 6 символа.'
    })
    .email({
      message: 'Email адрес почты.'
    }),
  phone: z.string().min(10, {
    message: 'Телефон минимум 10 цифр.'
  }),

  tin: z.string().min(12, {
    message: 'ИНН минимум 12 цифр.'
  })
})

export function UserProfileUpdateForm({
  userId,
  user
}: {
  user?: Partial<ResUser>
  userId: string
}) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.name || '',
      middleName: user?.middleName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: formatPhoneForInput(user?.phone || ''),
      tin: user?.tin || ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await userUpdate({
        userId,
        user: { ...data, phone: formatPhoneForSave(data.phone) }
      })
      form.reset()
      toast({
        variant: 'success',
        title: 'Информация создана.'
      })
    } catch (error) {
      console.log('error in userUpdate', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось обновить информацию .'
      })
    }
  }
  const handleLogOut = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <>
      <FormAvatar userId={userId} userAvatar={user?.avatar} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full  '>
          <div className=' flex w-full flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder='Имя...' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='middleName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Отчество</FormLabel>
                  <FormControl>
                    <Input placeholder='Отчество...' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input placeholder='Фамилия...' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email...' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={10} {...field}>
                      <div className='flex h-6 w-6 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all'>
                        +
                      </div>
                      <div className='flex h-6 w-6 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all'>
                        7
                      </div>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                        <InputOTPSlot index={8} />
                        <InputOTPSlot index={9} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tin'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ИНН</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={12} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={8} />
                        <InputOTPSlot index={9} />
                        <InputOTPSlot index={10} />
                        <InputOTPSlot index={11} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>Сохранить</Button>
            <Button
              variant='outline'
              type='button'
              asChild
              onClick={() => handleLogOut()}
            >
              <Link href='/'>Отмена</Link>
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
