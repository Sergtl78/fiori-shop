'use client'

import { EnterIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { signOut } from '~auth12'
import { UserIcon } from '../icon/User'
import { DropdownMenuItem } from '../ui/dropdown-menu'

type Props = {}

export default function NavAvatarItem(props: Props) {
  /* const actionsAuth = useActionCreators(authActions)
  const actionsCart = useActionCreators(cartActions)
  const actionsDelivery = useActionCreators(deliveryActions)

  const user = useAppSelector(selectUser) */

  return (
    <>
      <Link href={`/user/1`}>
        <DropdownMenuItem>
          <UserIcon className='mr-2 h-4 w-4' />
          <p>Профиль</p>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuItem onClick={() => signOut()}>
        <EnterIcon className='mr-2 h-4 w-4' />
        <span>Выйти</span>
      </DropdownMenuItem>
    </>
  )
}
