'use client'
import MediaImage from '@/components/media-Image'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { UpdateConnectionFn } from '../../_lib/api/for-forms/connectFormItemsVsMainCategory'

type Item = {
  id: string
  name: string
  url: string
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

const AddConnectionImage = ({
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
  const handleConnect = async (id: string) => {
    try {
      await connectFn(mainId, id)

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
          <Separator />
          <p>Фото товара</p>
          <ul className='grid w-full grid-cols-8 gap-4 '>
            {data.map(item => (
              <li
                className='relative w-full flex flex-col bg-card text-foreground items-center justify-between border rounded-lg shadow-sm text-sm overflow-hidden'
                key={item.id}
              >
                <MediaImage
                  image={{
                    url: item.url,
                    name: item.name
                  }}
                  className='aspect-square'
                />
                <p className='text-sm'>{item.name}</p>
                <Button
                  variant={'ghost'}
                  size='icon'
                  className='absolute top-0 right-0 bg-background hover:text-destructive-foreground  hover:bg-destructive'
                  onClick={() => handleDisconnect(item.id)}
                >
                  <Cross2Icon className='w-4 h-4' />
                </Button>
              </li>
            ))}
          </ul>
          <Separator />
          <p>Фото товаров в базе</p>
          <ul className='grid w-full grid-cols-8 gap-4 '>
            {resData.map(item => (
              <li
                className='relative w-full flex flex-col bg-card text-foreground items-center justify-between border rounded-lg shadow-sm text-sm overflow-hidden'
                key={item.id}
              >
                <MediaImage
                  image={{
                    url: item.url,
                    name: item.name
                  }}
                  className='aspect-square'
                />
                <p className='flex w-full text-sm'>{item.name}</p>
                <Button
                  variant={'ghost'}
                  size='icon'
                  className=' absolute top-0 right-0 bg-background hover:text-success-foreground  hover:bg-success'
                  onClick={() => handleConnect(item.id)}
                >
                  <CheckIcon className='w-6 h-6' />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardHeader>
    </Card>
  )
}

export default AddConnectionImage
