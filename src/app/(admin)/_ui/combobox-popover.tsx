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

type Data = {
  title?: string
  name?: string
  slug?: string
  id?: string
}
type Props = {
  data: Data[]
  title?: string
  pathName?: string
}

export function ComboboxPopover({ data, title, pathName }: Props) {
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
                    key={!!item.id ? item.id : item.slug}
                    value={item.name}
                    /*  onSelect={value => {
                      setSelectedStatus(
                        statuses.find(priority => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }} */
                  >
                    <Link
                      key={item.slug}
                      href={`${pathName}/${item.slug}`}
                      className='w-full '
                    >
                      <Button
                        variant='link'
                        className='w-full justify-start text-left text-foreground '
                      >
                        {item.name}
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
