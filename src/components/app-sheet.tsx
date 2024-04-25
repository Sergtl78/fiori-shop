'use client'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  icon: ReactNode
  footer?: ReactNode
  side?: 'left' | 'right' | 'bottom' | 'top'
  classNameSheet?: string
}

const AppSheet = ({
  children,
  icon,
  side = 'left',
  classNameSheet,
  footer
}: Props) => {
  return (
    <div>
      <Sheet key={side}>
        <SheetTrigger asChild>
          <Button variant='ghost' size={'icon'}>
            {icon}
          </Button>
        </SheetTrigger>
        <SheetContent side={side} className={classNameSheet}>
          <SheetHeader>
            <SheetTitle>
              <Logo title='Fiori' />
              <SheetDescription className=''>
                Продажа цветов и растений оптом.
              </SheetDescription>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className=' h-[calc(80vh)] w-full  border-b border-t border-tertiary'>
            {children}
          </ScrollArea>
          <SheetFooter>{footer}</SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default AppSheet
