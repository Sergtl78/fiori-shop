'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import {
  ResDelivery_item,
  updateDelivery_item
} from '../_lib/api/delivery_items'

const FormSchema = z.object({
  price: z
    .string()
    .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' }),

  quantity: z
    .string()
    .regex(new RegExp(/^\d+$/), { message: 'Должна быть число' }),
  productId: z.string()
})

type FormProps = {
  products: {
    id: string
    name: string
  }[]
  delivery_item: ResDelivery_item
}
export function UpdateDelivery_itemForm({
  products,
  delivery_item
}: FormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantity: delivery_item?.quantity.toString() ?? '0',
      price: delivery_item?.price.toString() ?? '0',
      productId: delivery_item?.Product?.id ?? ''
    }
  })

  async function onSubmit(dataSubmit: z.infer<typeof FormSchema>) {
    try {
      const res = await updateDelivery_item({
        id: delivery_item.id,
        data: {
          quantity: Number(dataSubmit.quantity),
          price: Number(dataSubmit.price),
          Product: { connect: { id: dataSubmit.productId } }
        }
      })
      router.refresh()
      return toast({
        title: 'Поставка успешно обновлена.',
        variant: 'success'
      })
    } catch (error) {
      console.log('error in createVendor', error)
      return toast({
        variant: 'destructive',
        title: 'Не удалось обновить поставку.'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <h3 className=''>Обновление поставки</h3>

        <FormField
          control={form.control}
          //key={field.id}
          name={`quantity`}
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
          name={`price`}
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
          name={`productId`}
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Товар</FormLabel>
              <Popover key={field.name} modal={true}>
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
                        ? products.find(product => product.id === field.value)
                            ?.name
                        : 'Выберите товар'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-80' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Найти...' className='h-9' />
                    <CommandEmpty>Товар не найден.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {products.map(product => (
                          <CommandItem
                            value={product.name}
                            key={product.id}
                            onSelect={() => {
                              form.setValue(`productId`, product.id)
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
        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  )
}
