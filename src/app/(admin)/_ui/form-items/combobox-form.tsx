'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { UpdateConnectionFn } from '../../_lib/api/for-forms/connectFormItemsVsMainCategory'

const FormSchema = z.object({
  id: z.string({
    required_error: 'Please select a language.'
  })
})

type ComboboxFormProps = {
  mainId: string
  title?: string
  data: { id: string; name: string; slug: string }[]
  connectFn: UpdateConnectionFn
}
export function ComboboxForm({
  data,
  connectFn,
  mainId,
  title
}: ComboboxFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit(dataSubmit: z.infer<typeof FormSchema>) {
    try {
      await connectFn(mainId, dataSubmit.id)

      //router.refresh()
      return toast({
        variant: 'success',
        title: 'Подключено'
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-row items-end gap-4 '>
          <FormField
            control={form.control}
            name='id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{title}</FormLabel>
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
                          ? data.find(item => item.id === field.value)?.name
                          : 'Выбрать...'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandList>
                        <CommandInput placeholder='Найти ...' className='h-9' />
                        <CommandEmpty>Не найдено.</CommandEmpty>
                        <CommandGroup>
                          {data.map(item => (
                            <CommandItem
                              value={item.name}
                              key={item.id}
                              onSelect={() => {
                                form.setValue('id', item.id)
                              }}
                            >
                              {item.name}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4 text-foreground',
                                  item.id === field.value
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
          <Button variant={'outline_primary'} size={'sm'} type='submit'>
            Добавить
          </Button>
        </div>
      </form>
    </Form>
  )
}
