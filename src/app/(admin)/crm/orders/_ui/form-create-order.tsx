'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
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
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { createOrder } from '../_lib/api/order-create'
import { ResUserForOrder } from '../_lib/api/orders'

const FormSchema = z.object({
  userId: z.string(),
  userShopId: z.string(),
  orderItems: z.array(
    z.object({
      quantityProduct: z
        .string()
        .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' }),

      productId: z.string()
    })
  )
})

type OrderFormProps = {
  products: {
    id: string
    name: string
  }[]
  users: ResUserForOrder[]
}
export function CreateOrderForm({ products, users }: OrderFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      orderItems: [{ quantityProduct: '0', productId: '' }],
      userId: '',
      userShopId: ''
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'orderItems',
    control: form.control
  })
  async function onSubmit(dataSubmit: z.infer<typeof FormSchema>) {
    try {
      const res = await createOrder(dataSubmit)
      router.refresh()
      return toast({
        title: 'Заказ успешно создан.',
        variant: 'success'
      })
    } catch (error: any) {
      console.log('error in createOrder', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось создать заказ.',
        description: error.message
      })
    }
  }

  const formUserId = form.watch('userId')
  console.log('formUserId', formUserId)

  const formUser =
    formUserId === '' ? null : users.find(user => user.id === formUserId)

  console.log('formUser', formUser)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <FormField
          control={form.control}
          name={'userId'}
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Пользователь</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? users.find(user => user.id === field.value)?.fullName
                        : 'Выберите пользователя'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Найти...' className='h-9' />
                    <CommandEmpty>Пользователь не найден.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {users.map(user => (
                          <CommandItem
                            value={user.fullName}
                            key={user.id}
                            onSelect={() => {
                              form.setValue(`userId`, user.id)
                            }}
                          >
                            {user.fullName}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                user.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        {formUser && formUser?.shops && (
          <FormField
            control={form.control}
            name={'userShopId'}
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Магазин</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-[200px] justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? formUser.shops.find(shop => shop.id === field.value)
                              ?.name
                          : 'Выберите магазин'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Найти...' className='h-9' />
                      <CommandEmpty>Магазин не найден.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {formUser.shops.map(shop => (
                            <CommandItem
                              value={shop.id}
                              key={shop.id}
                              onSelect={() => {
                                form.setValue(`userShopId`, shop.id)
                              }}
                            >
                              {shop.name}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  shop.id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className='flex flex-col gap-4 w-full'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='flex flex-row gap-4 w-full items-center'
            >
              <FormField
                control={form.control}
                //key={field.id}
                name={`orderItems.${index}.quantityProduct`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel /* className={cn(index !== 0 && 'sr-only')} */>
                      Количество упаковок
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                //key={field.id}
                control={form.control}
                name={`orderItems.${index}.productId`}
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Товар</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-[200px] justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? products.find(
                                  product => product.id === field.value
                                )?.name
                              : 'Выберите товар'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput
                            placeholder='Найти...'
                            className='h-9'
                          />
                          <CommandEmpty>Товар не найден.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {products.map(product => (
                                <CommandItem
                                  value={product.name}
                                  key={product.id}
                                  onSelect={() => {
                                    form.setValue(
                                      `orderItems.${index}.productId`,
                                      product.id
                                    )
                                  }}
                                >
                                  {product.name}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      product.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className=''
                type='button'
                variant={'destructive'}
                size={'icon'}
                onClick={() => remove(index)}
              >
                <Cross1Icon className='w-4 h-4' />
              </Button>
            </div>
          ))}
          <Button
            type='button'
            variant='secondary'
            size='sm'
            className='mt-2 w-fit self-start'
            onClick={() =>
              append({
                quantityProduct: '',
                productId: ''
              })
            }
          >
            Добавить поля
          </Button>
        </div>
        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  )
}
