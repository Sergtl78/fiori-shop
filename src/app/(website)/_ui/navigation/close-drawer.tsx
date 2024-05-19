import { DrawerClose } from '@/components/ui/drawer'
import { Cross1Icon } from '@radix-ui/react-icons'

type Props = {}

const CloseDrawer = (props: Props) => {
  return (
    <DrawerClose>
      <Cross1Icon className='w-4 h-4 fill-foreground cursor-pointer' />
    </DrawerClose>
  )
}

export default CloseDrawer
