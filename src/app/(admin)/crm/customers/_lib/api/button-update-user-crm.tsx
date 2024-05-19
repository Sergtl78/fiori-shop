'use client'

import { ResUser } from '@/app/(website)/_lib/api/user'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { UserProfileUpdateFormCrm } from './form-user-profile-update-crm'

type Props = {
  userId: string
  user?: ResUser
}

const ButtonUpdateUserCrm = ({ userId, user }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} variant='ghost'>
          <Pencil2Icon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm w-full rounded-lg flex flex-col'>
        <DialogHeader>
          <DialogTitle>Обновить профиль</DialogTitle>
        </DialogHeader>
        <UserProfileUpdateFormCrm userId={userId} user={user} />
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ButtonUpdateUserCrm
