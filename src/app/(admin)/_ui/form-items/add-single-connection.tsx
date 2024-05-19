'use client'
import { ComboboxForm } from '@/app/(admin)/_ui/form-items/combobox-form'
import { Card, CardContent } from '@/components/ui/card'
import { UpdateConnectionFn } from '../../_lib/api/for-forms/connectFormItemsVsMainCategory'

type Item = {
  id: string
  name: string
  slug: string
}

type Props = {
  mainId: string
  dataAll: Item[]
  title?: string
  description?: string
  connectFn: UpdateConnectionFn
}

const AddSingleConnection = ({
  mainId,
  dataAll,
  title,
  description,

  connectFn
}: Props) => {
  const resData = dataAll.filter(item => item.id !== mainId)

  return (
    <Card className='flex w-full flex-col items-start gap-4 '>
      <CardContent>
        <div className='flex w-full flex-col items-start gap-4 py-4'>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
          <ComboboxForm
            title={title}
            data={resData}
            connectFn={connectFn}
            mainId={mainId}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default AddSingleConnection
