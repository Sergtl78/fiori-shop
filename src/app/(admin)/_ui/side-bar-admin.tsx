'use client'
import Separator from '@/components/separator'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MenuItemCMS } from '../_lib/helpers/side-menu-cms'

type Props = {
  menuManager: MenuItemCMS[]
  menuAdmin?: MenuItemCMS[]
}

const SideBarAdmin = ({ menuManager, menuAdmin }: Props) => {
  const pathName = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const isAdmin = true
  return (
    <div
      data-collapsed={isCollapsed}
      className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'
    >
      <Button
        variant='ghost'
        size={'icon'}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRightIcon className='w-6 h-6' />
        ) : (
          <ChevronLeftIcon className='w-6 h-6' />
        )}
      </Button>
      <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {menuManager.map(link =>
          isCollapsed ? (
            <Link
              key={link.title}
              href={link.url}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'icon' }),
                'h-9 w-9 items-center justify-center',
                pathName.split('/')[2] === link.url.split('/')[2] &&
                  'bg-primary text-primary-foreground hover:text-primary-foreground'
              )}
            >
              <div className=''>{link.icon}</div>
              <span className='sr-only'>{link.title}</span>
            </Link>
          ) : (
            <Link
              key={link.title}
              href={link.url}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'default' }),
                'justify-start w-full gap-2 ',
                pathName.split('/')[2] === link.url.split('/')[2] &&
                  'bg-primary text-primary-foreground hover:text-primary-foreground'
              )}
            >
              {link.icon}
              {link.title}
            </Link>
          )
        )}
        <Separator className='my-2 bg-muted-foreground ' />
        {menuAdmin?.map(link =>
          isCollapsed ? (
            <Link
              key={link.title}
              href={link.url}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'icon' }),
                'h-9 w-9 items-center justify-center',
                pathName.split('/')[2] === link.url.split('/')[2] &&
                  'bg-primary text-primary-foreground hover:text-primary-foreground'
              )}
            >
              <div className=''>{link.icon}</div>
              <span className='sr-only'>{link.title}</span>
            </Link>
          ) : (
            <Link
              key={link.title}
              href={link.url}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'default' }),
                'justify-start w-full gap-2 ',
                pathName.split('/')[2] === link.url.split('/')[2] &&
                  'bg-primary text-primary-foreground hover:text-primary-foreground'
              )}
            >
              {link.icon}
              {link.title}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}

export default SideBarAdmin
