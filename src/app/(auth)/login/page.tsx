import { LoginForm } from '@/app/(auth)/_ui/login-form'
import SectionForm from '@/app/(auth)/_ui/section-form'
import { auth } from 'auth*'
import Image from 'next/image'
import { redirect } from 'next/navigation'

type Props = {
  searchParams?: Record<'callbackUrl' | 'error', string>
}

const LoginPage = async ({ searchParams }: Props) => {
  const session = await auth()
  if (session) redirect('/')
  return (
    <section className='min-h-svh relative container grid md:grid-cols-2'>
      <div className='hidden md:flex relative aspect-square max-w-lg items-center justify-center w-full h-full '>
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/fiori_square.svg`}
          alt=''
          fill
          priority
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
