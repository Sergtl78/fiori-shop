'use client'
import { SmileIcon } from '@/components/icon/Smile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { EnterIcon } from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import NavAvatarItem from './nav-avatar-item'
export function AvatarUser() {
  const { data: session } = useSession()

  return (
    <>
      {!!session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {!!session ? (
              <Avatar>
                <AvatarImage
                  src={session.user?.avatar ?? (session.user?.image || '')}
                  alt={session.user?.name || ''}
                />
                <AvatarFallback>
                  <SmileIcon className='h-full w-full ' />
                </AvatarFallback>
              </Avatar>
            ) : (
              <SmileIcon className='h-full w-full ' />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-background p-2 '>
            <NavAvatarItem />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={'/login'}>
          <Button variant={'outline'}>
            <EnterIcon className='mr-2 h-4 w-4' /> Войти
          </Button>
        </Link>
      )}
    </>
  )
}
