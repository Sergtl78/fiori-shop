'use client'
import CloseDrawer from '@/app/(website)/_ui/navigation/close-drawer'
import Logo from '@/components/logo'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DoubleArrowDownIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'

type MobileNavProps = {
  children?: ReactNode
  icon: ReactNode
  footer?: ReactNode
}

const AppDrawer = ({ children, icon, footer }: MobileNavProps) => {
  //const [open, setOpen] = useState(false)

  return (
    <Drawer>
      <DrawerTrigger asChild>{icon}</DrawerTrigger>
      <DrawerContent className='h-[calc(100vh-4rem)]'>
        <div className='container'>
          <DrawerHeader className=' relative '>
            <DoubleArrowDownIcon className='w-6 h-6 absolute -top-3 right-1/2 translate-x-1/2' />
            <div className='flex justify-between'>
              <DrawerTitle>
                <Logo />
              </DrawerTitle>
              <CloseDrawer />
            </div>
          </DrawerHeader>

          <ScrollArea
            className={
              ' h-[calc(75vh-1rem)] w-full  border-b border-t border-tertiary items-center'
            }
          >
            {children}
          </ScrollArea>

          <DrawerFooter className='flex min-h-fit '>{footer}</DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AppDrawer
