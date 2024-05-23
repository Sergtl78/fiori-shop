import SectionForm from '@/app/(auth)/_ui/section-form'
import Image from 'next/image'
import { LoginForm } from '../_ui/login-form'

type Props = {
  searchParams?: Record<'callbackUrl' | 'error', string>
}

const LoginPasswordPage = ({ searchParams }: Props) => {
  return (
    <section className='h-screen relative container grid md:grid-cols-2'>
      <SectionForm typeForm='register'>
        <LoginForm
          callbackUrl={searchParams?.callbackUrl}
          errorAuth={searchParams?.error}
        />
      </SectionForm>
      <div className='hidden md:flex relative aspect-square max-w-lg items-center justify-center w-full h-full '>
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/fiori_square.svg`}
          alt=''
          fill
          priority
          className='object-contain'
        />
      </div>
    </section>
  )
}

export default LoginPasswordPage
