import { LoginForm } from '@/app/(auth)/_ui/login-form'
import SectionForm from '@/app/(auth)/_ui/section-form'
import Image from 'next/image'

type Props = {
  searchParams?: Record<'callbackUrl' | 'error', string>
}

const LoginPage = ({ searchParams }: Props) => {
  return (
    <section className='h-screen relative container grid md:grid-cols-2'>
      <div className='hidden md:flex relative aspect-square max-w-lg items-center justify-center w-full h-full '>
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/fiori_square.svg`}
          alt=''
          fill
          className='object-contain'
        />
      </div>
      <SectionForm typeForm='login'>
        <LoginForm
          callbackUrl={searchParams?.callbackUrl}
          errorAuth={searchParams?.error}
        />
      </SectionForm>
    </section>
  )
}

export default LoginPage
