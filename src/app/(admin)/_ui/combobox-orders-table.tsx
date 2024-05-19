'use client'

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
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { CaretSortIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

type CartItem = {
  quantityProduct: number
  Product: {
    id: string
    name: string
    slug: string
    price: number
    min_quantity: number
  } | null
}
type Props = {
  data: CartItem[]
  title?: string
  pathName?: string
}

export function ComboboxOrderTable({ data, title, pathName }: Props) {
  const [open, setOpen] = useState(false)
  /* const [selectedStatus, setSelectedStatus] = useState<Data[] | null>(null) */

  return (
    <div className='flex items-center space-x-4'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='ghost' size='sm' asChild>
            <div className='flex items-center space-x-2'>
              <span className='text-sm font-semibold'>{`${title} (${data.length})`}</span>
              <CaretSortIcon className='h-4 w-4' />
              <span className='sr-only'>Toggle</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0' side='right' align='start'>
          <Command>
            <CommandInput placeholder='Найти...' />
            <CommandList>
              <CommandEmpty>Не найдено.</CommandEmpty>
              <CommandGroup>
                {data.map(item => (
                  <CommandItem
                    key={
                      !!item.Product?.id ? item.Product.id : item.Product?.slug
                    }
                    value={item.Product?.name}
                    /*  onSelect={value => {
                      setSelectedStatus(
                        statuses.find(priority => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }} */
                  >
                    <Link
                      key={item.Product?.slug}
                      href={`${pathName}/${item.Product?.slug}`}
                      className='w-full '
                    >
                      <Button
                        variant='ghost'
                        className='w-full justify-between items-center text-left text-foreground '
                      >
                        <span>{item.Product?.name}</span>
                        <span>
                          {item.quantityProduct} уп.X{' '}
                          {item.Product?.min_quantity} шт.
                        </span>
                        <span>
                          {item.quantityProduct *
                            (item.Product?.min_quantity || 1)}{' '}
                          шт.
                        </span>
                      </Button>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
