'use client'

import { logout } from '@/app/(auth)/_lib/actions'
import { UserIcon } from '@/components/icon/User'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { EnterIcon } from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {}

export default function NavAvatarItem(props: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  const handleSignOut = async () => {
    await logout()
    router.push('/login')
  }
  return (
    <>
      <Link href={`/profile/${session?.user.id}`}>
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
