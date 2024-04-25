'use client'

import { logout } from '@/app/(auth)/_lib/actions'
import { UserIcon } from '@/components/icon/User'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { EnterIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

type Props = {}

export default function NavAvatarItem(props: Props) {
  const handleSignOut = async () => {
    await logout()
  }
  return (
    <>
      <Link href={`/user/1`}>
        <DropdownMenuItem>
          <UserIcon className='mr-2 h-4 w-4' />
          <p>Профиль</p>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuItem onClick={() => handleSignOut()}>
        <EnterIcon className='mr-2 h-4 w-4' />
        <span>Выйти</span>
      </DropdownMenuItem>
    </>
  )
}
