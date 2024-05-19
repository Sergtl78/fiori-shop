'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Table } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { IdsType } from '../cms/products/_lib/api/products'

type ButtonDeleteProps<TData> = {
  table: Table<TData>
  deleteFn: (ids: IdsType) => Promise<void>
}

export function ButtonDelete<TData>({
  table,
  deleteFn
}: ButtonDeleteProps<TData>) {
  const router = useRouter()
  const ids: IdsType = table
    .getSelectedRowModel()
    .flatRows.map(row => row.getValue('id'))
  if (ids.length === 0) return

  const handleClick = async () => {
    try {
      await deleteFn(ids)
      table.reset()

      toast({
        variant: 'success',
        title: 'Удалено'
      })

      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Произошла ошибка, попробуйте позже'
      })
    }
  }

  return (
    <Button onClick={() => handleClick()} variant='destructive' size={'sm'}>
      Удалить{ids.length}
    </Button>
  )
}
