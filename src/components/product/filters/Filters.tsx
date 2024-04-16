'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/components/ui/use-toast'
import { ForFiltersData } from '@/lib/api/for-filters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const FormSchema = z.object({
  mainCategories: z.array(z.string()),
  categories: z.array(z.string()),
  subCategories: z.array(z.string()),
  vendors: z.array(z.string()),
  colors: z.array(z.string()),
})

type Props = {
  mainCategories: ForFiltersData[]
  categories: ForFiltersData[]
  subCategories: ForFiltersData[]
  vendors: ForFiltersData[]
  colors: (ForFiltersData & { colorHex: string })[]
}
export function Filters({
  mainCategories,
  categories,
  subCategories,
  vendors,
  colors,
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mainCategories: [],
      categories: [],
      subCategories: [],
      vendors: [],
      colors: [],
    },
  })
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams(searchParams)
    if (data.mainCategories.length > 0) {
      params.set('main_categoryIds', data.mainCategories.join(','))
    } else {
      params.delete('main_categoryIds')
    }
    replace(`${pathname}?${params.toString()}`)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full '>
        <div className='mb-4'>
          <FormLabel className='text-base'>Выберите параметры</FormLabel>
        </div>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] w-full space-y-4 pb-10'>
          <div className='mb-4 space-y-2'>
            {mainCategories.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={'mainCategories'}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className='flex flex-row items-start space-x-3 space-y-0'
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field?.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id,
                                  ),
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
            <FormLabel className='text-base'>Производители</FormLabel>
          </div>
          <div className='mb-4 space-y-2'>
            {vendors.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={'vendors'}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className='flex flex-row items-start space-x-3 space-y-0'
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field?.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id,
                                  ),
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
            <FormLabel className='text-base'>Вид растений</FormLabel>
          </div>
          <div className='mb-4 space-y-2'>
            {categories.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={'categories'}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className='flex flex-row items-start space-x-3 space-y-0'
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field?.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id,
                                  ),
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
            <FormLabel className='text-base'>Тип растений</FormLabel>
          </div>
          <div className='mb-4 space-y-2'>
            {subCategories.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={'subCategories'}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className='flex flex-row items-start space-x-3 space-y-0'
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field?.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id,
                                  ),
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
            <FormLabel className='text-base'>Тип растений</FormLabel>
          </div>
          <div className='mb-4 space-y-2'>
            {colors.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={'colors'}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className='flex flex-row items-start space-x-3 space-y-0'
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field?.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id,
                                  ),
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className='text-sm font-normal'>
                        <div className='flex items-center space-x-2'>
                          <span
                            style={{ backgroundColor: item.colorHex }}
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
        </ScrollArea>
        <Button type='submit'>Показать</Button>
      </form>
    </Form>
  )
}
