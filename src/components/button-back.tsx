'use client'

import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

const ButtonBack = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.back()} variant={'ghost'} className='w-fit'>
      <ArrowLeftIcon className='mr-2 h-4 w-4' />
      Назад
    </Button>
  )
}

export default ButtonBack
