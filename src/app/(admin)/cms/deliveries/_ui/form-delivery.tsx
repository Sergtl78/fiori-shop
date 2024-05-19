'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
  FormDescription,
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
import { cn, formatDate } from '@/lib/utils'
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  Cross1Icon
} from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { createDelivery, getDeliveryBySlug } from '../_lib/api/deliveries'

const FormSchema = z.object({
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
        const category = await getDeliveryBySlug(slug)
        if (category) return false
        return true
      },
      {
        message: 'Slug уже существует.'
      }
    ),
  data: z.date(),
  availability: z.array(
    z.object({
      price: z
        .string()
        .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' }),

      quantity: z
        .string()
        .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' }),
      productId: z.string()
    })
  )
})

type DeliveryFormProps = {
  products: {
    id: string
    name: string
  }[]
}
export function DeliveryForm({ products }: DeliveryFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slug: '',
      data: new Date(Date.now()),
      availability: [{ quantity: '0', price: '0', productId: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'availability',
    control: form.control
  })
  async function onSubmit(dataSubmit: z.infer<typeof FormSchema>) {
    const delivery_itemsWithDate = dataSubmit.availability.map(item => {
      return {
        price: Number(item.price),
        quantity: Number(item.quantity),
        dateDelivery_item: dataSubmit.data,
        productId: item.productId
      }
    })

    try {
      const res = await createDelivery({
        date: dataSubmit.data,
        slug: dataSubmit.slug,
        delivery_items: delivery_itemsWithDate
      })
      router.refresh()
      return toast({
        title: 'Поставка успешно создана.',
        variant: 'success'
      })
    } catch (error) {
      console.log('error in createVendor', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось создать поставку.'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <h3 className=''>Создание поставки</h3>
        <FormField
          control={form.control}
          name='data'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Дата доставки</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        formatDate(field.value)
                      ) : (
                        <span>Выберите дату</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Дата поставки.</FormDescription>
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

        <div className='flex flex-col gap-4 w-full'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='flex flex-row gap-4 w-full items-center'
            >
              <FormField
                control={form.control}
                //key={field.id}
                name={`availability.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel /* className={cn(index !== 0 && 'sr-only')} */>
                      Количество
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                //key={field.id}
                name={`availability.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel /* className={cn(index !== 0 && 'sr-only')} */>
                      Цена
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
                name={`availability.${index}.productId`}
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
                                      `availability.${index}.productId`,
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
                quantity: '',
                price: '',
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
