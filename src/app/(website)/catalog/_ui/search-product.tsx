'use client'
import { SearchIcon } from '@/components/icon/Search'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
  search?: string
}

const SearchProduct = ({ search }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = /* useDebouncedCallback( */ (term: string) => {
    console.log(`Searching... ${term}`)

    const params = new URLSearchParams(searchParams)
    //params.set('page', '1')
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  } /* , 300) */

  return (
    <>
      <Label className='relative'>
        <Input
          type='search'
          className='pl-10  md:min-w-80'
          placeholder='Название...'
          onChange={e => handleSearch(e.target.value)}
          defaultValue={searchParams.get('search')?.toString()}
        />
        <SearchIcon
          name='search'
          className='pointer-events-none absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground'
        />
      </Label>
    </>
  )
}

export default SearchProduct
function useDebouncedCallback(arg0: (term: any) => void, arg1: number) {
  throw new Error('Function not implemented.')
}
