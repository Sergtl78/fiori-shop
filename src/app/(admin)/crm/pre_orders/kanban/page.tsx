import { Button } from '@/components/ui/button'
import { TableIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import Columns from './_ui/columns'

type Props = {}

const PreOrderKanBanPage = async (props: Props) => {
  return (
    <div className='container flex flex-col pt-8 gap-4'>
      <Link href={'/crm/pre_orders/table'}>
        <Button className='w-fit' variant={'outline_primary'} asChild>
          <TableIcon className='w-6 h-6' />
        </Button>
      </Link>
      <h2>Предзаказы</h2>
      <Columns />
    </div>
  )
}

export default PreOrderKanBanPage
