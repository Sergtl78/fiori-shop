'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Props = {
  pageSize: string
}

const SelectCount = ({}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPageSize = Number(searchParams.get('pageSize')) || 2
  const [value, setValue] = useState(currentPageSize.toString())

  const createPageURL = (pageSize: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('pageSize', pageSize.toString())
    return `${pathname}?${params.toString()}`
  }
  return (
    <div className='flex items-center space-x-2'>
      <p className='text-sm font-medium'>Заказов на странице</p>
      <Select
        value={value}
        onValueChange={value => {
          setValue(value)
          router.push(createPageURL(value), { scroll: false })
        }}
      >
        <SelectTrigger className='h-8 w-[70px]'>
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent side='top'>
          {[2, 3, 5, 10].map(pageSize => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectCount
