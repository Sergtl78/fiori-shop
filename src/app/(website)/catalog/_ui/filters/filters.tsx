'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DrawerClose } from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Color, Vendor } from '@prisma/client'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const FormSchema = z.object({
  vendors: z.array(z.string()),
  colors: z.array(z.string())
})

type Props = {
  vendors: Vendor[]
  colors: Color[]
}
export function Filters({ vendors, colors }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vendors: searchParams.get('vendorsSlugs')?.split(',') ?? [],
      colors: searchParams.get('colorsSlugs')?.split(',') ?? []
    }
  })

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('vendorsSlugs')
    params.delete('colorsSlugs')
    replace(`${pathname}?${params.toString()}`)
  }
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams(searchParams)
    if (data.vendors.length > 0) {
      params.set('vendorsSlugs', data.vendors.join(','))
    } else {
      params.delete('vendorsSlugs')
    }
    if (data.colors.length > 0) {
      params.set('colorsSlugs', data.colors.join(','))
    } else {
      params.delete('colorsSlugs')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full '>
        <div className='mb-4'>
          <FormLabel className='text-base'>Выберите параметры</FormLabel>
        </div>
        <div className='mb-4'>
          <FormLabel className='text-base'>Производители</FormLabel>
        </div>
        <div className='mb-4 space-y-2'>
          {vendors.map(item => (
            <FormField
              key={item.slug}
              control={form.control}
              name={'vendors'}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.slug}
                    className='flex flex-row items-center space-x-3 space-y-0'
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.slug)}
                        onCheckedChange={checked => {
                          return checked
                            ? field.onChange([...field?.value, item.slug])
                            : field.onChange(
                                field.value?.filter(
                                  value => value !== item.slug
                                )
                              )
                        }}
                      />
                    </FormControl>
                    <FormLabel className='text-sm font-normal'>
                      {item.name}
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}
        </div>
        <div className='mb-4'>
          <FormLabel className='text-base'>Цвет растений</FormLabel>
        </div>

        <div className='mb-4 space-y-2'>
          {colors.map(item => (
            <FormField
              key={item.slug}
              control={form.control}
              name={'colors'}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.slug}
                    className='flex flex-row items-center space-x-3 space-y-0 '
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.slug)}
                        onCheckedChange={checked => {
                          return checked
                            ? field.onChange([...field?.value, item.slug])
                            : field.onChange(
                                field.value?.filter(
                                  value => value !== item.slug
                                )
                              )
                        }}
                      />
                    </FormControl>
                    <FormLabel className='text-sm font-normal'>
                      <div className='flex items-center space-x-2'>
                        <span
                          style={{ backgroundColor: item.hex }}
                          className='h-4 w-4 rounded-full'
                        />
                        <p>{item.name}</p>
                      </div>
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}
        </div>
        {/* </ScrollArea> */}
        <div className='flex flex-col gap-4'>
          <DrawerClose asChild>
            <Button type='submit' className='w-full'>
              Показать
            </Button>
          </DrawerClose>
          <Link href={pathname} className='w-full'>
            <DrawerClose asChild>
              <Button
                type='reset'
                variant='outline'
                className='w-full'
                onClick={() => resetFilters()}
              >
                Сбросить фильтры
              </Button>
            </DrawerClose>
          </Link>
          <Button
            type='reset'
            variant='outline'
            className='w-full'
            onClick={() => {
              form.reset()
            }}
          >
            Сбросить форму
          </Button>
        </div>
      </form>
    </Form>
  )
}
