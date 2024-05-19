'use client'
import Logo from '@/components/logo'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { logout } from '../(auth)/_lib/actions'

type Props = {}

const WaitAdminPage = (props: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const handleSignOut = async () => {
    await logout()
    router.push('/')
  }
  return (
    <section className='container flex flex-col w-full min-h-svh items-center justify-center gap-4 mb-8'>
      <Logo className='h-20' />
      <h3>Уважаемый, {session?.user?.name}</h3>
      <p>
        Вы получите доступ на сайт в ближайшее время, после проверки
        администратором.
      </p>
      <p>Спасибо за понимание.</p>
      <div className='w-full flex items-center justify-between max-w-sm'>
        <Link href='/' className={cn(buttonVariants({ variant: 'outline' }))}>
          {' '}
          Вернуться на главную
        </Link>
        <Button onClick={() => handleSignOut()} variant={'outline'}>
          Выйти
        </Button>
      </div>
    </section>
  )
}
export default WaitAdminPage
