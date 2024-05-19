'use client'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UpdateVisibleFn } from '../../_lib/api/for-forms/changeVisibleFormItems'

type Props = {
  id: string
  title?: string
  visible: boolean
  changeVisibleFN: UpdateVisibleFn
}

const SwitchVisibleForm = ({ id, title, visible, changeVisibleFN }: Props) => {
  const router = useRouter()
  const [checked, setChecked] = useState(visible)
  const handleChange = async () => {
    try {
      await changeVisibleFN(id, !checked)
      revalidatePath('/crm/customers')
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

export default SwitchVisibleForm
