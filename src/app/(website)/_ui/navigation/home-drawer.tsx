import AppDrawer from '@/components/app-drawer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HomeIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import CloseDrawer from './close-drawer'
import SocialContacts from './social-contacts'

type Props = {}

const HomeDrawer = (props: Props) => {
  return (
    <AppDrawer
      icon={<HomeIcon className='h-8 w-8  ' />}
      footer={<CloseDrawer />}
    >
      <div className='flex flex-col h-full w-full items-center justify-center gap-2'>
        <Card className='w-full flex flex-col p-4 gap-2'>
          <Link href='/'>
            <Button className='w-full' variant={'outline'}>
              Главная страница{' '}
            </Button>
          </Link>
          <Link href='/catalog'>
            <Button className='w-full' variant={'outline'}>
              Каталог
            </Button>
          </Link>
        </Card>
        <SocialContacts />
      </div>
    </AppDrawer>
  )
}

export default HomeDrawer
