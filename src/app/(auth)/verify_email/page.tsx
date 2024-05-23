import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

type Props = {}

const VerifyEmailPage = (props: Props) => {
  return (
    <section className='container flex min-h-svh flex-1 flex-col items-center justify-center '>
      <Card>
        <Logo className='w-32 h-32 mx-auto' />
        <CardContent className='text-center gap-4 mb-4'>
          <CardTitle className='text-2xl mb-4'>
            Проверьте свой почтовый ящик
          </CardTitle>
          <p className=''>
            Ссылка для входа на сайт была отправлена на ваш email.
          </p>
          <Separator className='my-4' />
          <CardDescription className=''>
            Если вы не получили письмо, проверьте папку спам.
          </CardDescription>
        </CardContent>
        <CardFooter className='flex justify-center '>
          <Link href='/login'>
            <Button variant={'outline'}>Перейти на страницу входа</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  )
}

export default VerifyEmailPage
