'use client'

import * as React from 'react'
//import { Check, ChevronsUpDown } from "lucide-react"

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
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

type ArgType = {
  value: string
  label: string
}

type Props = {
  options?: ArgType[]
  value?: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}
export function ComboboxPopoverSearch({ options, setValue, value }: Props) {
  const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState('id')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? options && options.find(item => item.value === value)?.label
            : 'Выберите...'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Найти...' />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup>
              {options &&
                options.map(item => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === item.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
