'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { StatusDelivey } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { registerDelivery } from '../_lib/api/deliveries'

type Props = {
  deliveryId: string
  statusDelivery: StatusDelivey
}

const ButtonRegisterDelivery = ({ deliveryId, statusDelivery }: Props) => {
  const router = useRouter()
  const handleRegister = async () => {
    try {
      const res = await registerDelivery(deliveryId)
      toast({
        title: 'Поставка оприходована.',
        variant: 'success'
      })
      router.push('/cms/deliveries/table')
    } catch (error) {
      console.log('registerDelivery error', error)
      toast({
        title: 'Не удалось оприходовать поставку.',
        variant: 'destructive'
      })
    }
  }
  return (
    <Button
      disabled={statusDelivery === 'REGISTERED'}
      className='w-fit'
      onClick={() => handleRegister()}
    >
      Оприходовать
    </Button>
  )
}

export default ButtonRegisterDelivery
