'use client'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UpdateVisibleFn } from '../../_lib/api/for-forms/changeVisibleFormItems'

type Props = {
  id: string
  title?: string
  blocked: boolean
  changeVisibleFN: UpdateVisibleFn
}

const SwitchBlockUserForm = ({
  id,
  title,
  blocked,
  changeVisibleFN
}: Props) => {
  const router = useRouter()
  const [checked, setChecked] = useState(blocked)
  const handleChange = async () => {
    try {
      await changeVisibleFN(id, !checked)

      router.refresh()
      return toast({
        variant: 'success',
        title: 'Видимость изменена'
      })
    } catch (error) {
      console.log(error)
      return toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Что-то пошло не так'
      })
    }
  }
  return (
    <div className='flex flex-col items-center gap-2'>
      <p className='text-sm'>{title}</p>
      <Switch
        checked={checked}
        onCheckedChange={() => {
          handleChange()
          setChecked(!checked)
        }}
      />
    </div>
  )
}

export default SwitchBlockUserForm
