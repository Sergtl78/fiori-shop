'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { changeRoleNewToUser } from '../../_lib/api/for-forms/change-user-role'

type Props = {
  userId: string
}

const ButtonAddRoleUser = ({ userId }: Props) => {
  const router = useRouter()
  const handleChangeRole = async () => {
    try {
      const res = await changeRoleNewToUser(userId)
      router.refresh()
      toast({
        variant: 'success',
        title: 'Роль пользователя изменена'
      })
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Не удалось изменить роль пользователя'
      })
    }
  }
  return (
    <Button
      onClick={() => handleChangeRole()}
      variant='outline_primary'
      size={'sm'}
    >
      USER
    </Button>
  )
}

export default ButtonAddRoleUser
