'use client'
import { PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { SmileIcon } from '../icon/Smile'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import NavAvatarItem from './NavAvatarItem'
export function AvatarUser({ user }: { user?: { id?: string } }) {
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg hover:scale-105 hover:border-primary-foreground hover:text-primary-foreground '>
              {false ? <div /> : <SmileIcon className='h-full w-full ' />}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-background p-2 '>
            <NavAvatarItem />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={'/login'}>
          <PersonIcon className='h-6 w-6' />
        </Link>
      )}
    </>
  )
}
