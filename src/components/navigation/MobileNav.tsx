'use client'
import { HamburgerMenuIcon, HomeIcon } from '@radix-ui/react-icons'
import { ReactNode, useState } from 'react'
import Logo from '../Logo'
import { ModeToggle } from '../ModeToggle'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { ScrollArea } from '../ui/scroll-area'
import MobileLink from './MobileLink'
import { AvatarUser } from './NavAvatarUser'

type MobileNavProps = {
  children: ReactNode
  //mainCategories: NonNullable<GetMainCategoriesQuery['mainCategories']>['data']
}

const MobileNav = ({ children }: MobileNavProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='fixed bottom-0 left-0 z-50 w-full border-t md:hidden'>
      <Drawer open={open} onOpenChange={setOpen}>
        <div className='grid h-14 w-full grid-cols-5 bg-background'>
          <MobileLink
            href='/'
            className='flex items-center justify-center'
            onOpenChange={setOpen}
          >
            <HomeIcon className='h-8 w-8  ' />
          </MobileLink>
          <div className='flex items-center justify-center'>
            <DrawerTrigger asChild>
              <Button
                variant='ghost'
                className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
              >
                <HamburgerMenuIcon className='h-8 w-8 fill-primary-foreground' />

                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </DrawerTrigger>
          </div>
          <MobileLink
            href='/cart'
            className='flex items-center justify-center'
            onOpenChange={setOpen}
          >
            <div></div>
            {/* <CartNavIcon /> */}
          </MobileLink>
          <div
            className='flex items-center justify-center'
            onClick={() => {
              setOpen
            }}
          >
            {/*  <SearchNav mainCategories={mainCategories} /> */}
          </div>
          <div
            className='flex items-center justify-center'
            onClick={() => {
              setOpen
            }}
          >
            <AvatarUser />
          </div>
        </div>
        <DrawerContent className='max-h-[80%] px-4'>
          <div className='flex w-full items-center justify-between'>
            <Logo title='Фиори' />
            <ModeToggle />
          </div>

          <ScrollArea className='my-4 h-[calc(100vh-8rem)] px-4 pb-10'>
            {children}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default MobileNav
