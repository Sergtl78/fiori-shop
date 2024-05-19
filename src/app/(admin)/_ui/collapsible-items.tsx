'use client'

import { CaretSortIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  data: { title?: string; name?: string; slug?: string; id?: string }[]
  title?: string
  pathName?: string
}
export function CollapsibleItems({ data, title, pathName }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='w-full space-y-2 relative'
    >
      <div className='flex items-center justify-between space-x-4 px-4'>
        <p className='text-sm font-semibold'>{`${title} (${data.length})`}</p>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='sm'>
            <CaretSortIcon className='h-4 w-4' />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className='space-y-2 absolute bottom-0 left-0 right-0 w-fit'>
        {data.map(item => (
          <Link
            key={item.slug}
            href={`${pathName}/${item.slug}`}
            className='w-full '
          >
            <Button
              variant='link'
              className='w-full justify-start text-left text-foreground'
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
