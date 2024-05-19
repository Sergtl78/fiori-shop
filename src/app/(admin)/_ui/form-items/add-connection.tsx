'use client'
import { ComboboxForm } from '@/app/(admin)/_ui/form-items/combobox-form'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { UpdateConnectionFn } from '../../_lib/api/for-forms/connectFormItemsVsMainCategory'

type Item = {
  id: string
  name: string
  slug: string
}

type Props = {
  mainId: string
  data: Item[]
  dataAll: Item[]
  title?: string
  description?: string
  connectFn: UpdateConnectionFn
  disconnectFn: UpdateConnectionFn
}

const AddConnection = ({
  data,
  dataAll,
  title,
  description,
  mainId,
  connectFn,
  disconnectFn
}: Props) => {
  const router = useRouter()

  let resData: Item[] = []
  const arr = data.map(item => item.id)
  const arrAll = dataAll.map(item => item.id)

  for (let i = 0; i < arrAll.length; i++) {
    if (!arr.includes(arrAll[i])) {
      resData.push(dataAll[i])
    }
  }
  const handleDisconnect = async (id: string) => {
    try {
      await disconnectFn(mainId, id)

      router.refresh()
      return toast({
        variant: 'success',
        title: 'Подключение удалено'
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
    <Card className='flex w-full flex-col items-start gap-4 '>
      <CardHeader>
        <div className='flex w-full flex-col items-start gap-4 py-4'>
          <div className='flex w-full flex-col items-start '>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
          </div>
          <ComboboxForm
            title={title}
            data={resData}
            connectFn={connectFn}
            mainId={mainId}
          />
        </div>
        <ul className='grid w-full grid-cols-8 gap-4 '>
          {data.map(item => (
            <li
              className='w-full flex bg-card text-foreground items-center justify-between border border-foreground rounded-md shadow-sm text-sm'
              key={item.id}
            >
              <span className='px-4 py-2'>{item.name}</span>

              <Button
                onClick={() => handleDisconnect(item.id)}
                variant='ghost'
                size='icon'
                className='hover:text-destructive-foreground  hover:bg-destructive px-2'
              >
                <Cross2Icon className='w-4 h-4' />
              </Button>
            </li>
          ))}
        </ul>
      </CardHeader>
    </Card>
  )
}

export default AddConnection
