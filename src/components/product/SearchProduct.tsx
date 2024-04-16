'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { SearchIcon } from '../icon/Search'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Props = {
  search?: string
}

const SearchProduct = ({ search }: Props) => {
  const router = useRouter()
  const initialRender = useRef(true)

  const [text, setText] = useState(search)
  const [query] = useDebounce(text, 750)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (!query) {
      router.push(`/catalog`)
    } else {
      router.push(`/catalog?search=${query}`)
    }
  }, [query, router])
  return (
    <Label className='relative mb-4 w-full max-w-sm shadow-sm '>
      <Input
        type='search'
        className='pl-10  w-full  '
        placeholder='Название...'
        onChange={e => setText(e.target.value)}
        //value={text}
      />
      <SearchIcon
        name='search'
        className='pointer-events-none absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground'
      />
    </Label>
  )
}

export default SearchProduct
