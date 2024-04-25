import { RegisterForm } from '@/app/(auth)/_ui/register-form'
import SectionForm from '@/app/(auth)/_ui/section-form'
import Image from 'next/image'

type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <section className='h-screen relative container grid md:grid-cols-2'>
      <SectionForm typeForm='register'>
        <RegisterForm />
      </SectionForm>
      <div className='hidden md:flex relative '>
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/image-1.svg`}
          alt=''
          fill
          className='object-cover'
        />
      </div>
    </section>
  )
}

export default RegisterPage
