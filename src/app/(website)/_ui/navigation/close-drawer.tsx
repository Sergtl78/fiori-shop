import { Button } from '@/components/ui/button'
import { DrawerClose } from '@/components/ui/drawer'
import { Cross1Icon } from '@radix-ui/react-icons'

type Props = {}

const CloseDrawer = (props: Props) => {
  return (
    <DrawerClose>
      <Button variant={'ghost'} size={'icon'}>
        <Cross1Icon className='w-4 h-4 fill-foreground cursor-pointer' />
      </Button>
    </DrawerClose>
  )
}

export default CloseDrawer
