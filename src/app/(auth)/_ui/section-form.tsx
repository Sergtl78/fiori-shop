import Logo from '@/components/logo'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'

type Props = {
  children: ReactNode
  typeForm: 'login' | 'register'
  callbackUrl?: string
  error?: string
}

const SectionForm = ({ children, typeForm, callbackUrl }: Props) => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex flex-col  w-full max-w-sm p-4'>
        <div className='flex mb-4 w-full justify-center'>
          <Logo />
        </div>
        <h3 className='text-center font-normal mb-4 italic'>
          {typeForm === 'login'
            ? 'Войдите или зарегистрируйтесь'
            : 'Войдите с паролем'}
        </h3>
        {children}

        <div className='flex flex-row gap-2 mb-4'>
          <Checkbox checked={true} />
          <div className='text-sm'>
            <span>Соглашаюсь с </span>{' '}
            <Link className='text-primary underline' href='/privacy'>
              правилами пользования
            </Link>
            <span> торговой площадкой и возврата.</span>
          </div>
        </div>
        {typeForm === 'login' ? (
          <div className='text-sm text-center flex w-full'>
            {/*  <span>Войти с паролем —</span>{' '} */}
            <Link className='flex w-full justify-end' href='/login_password'>
              <Button variant={'link'}>Войти с паролем</Button>
            </Link>
          </div>
        ) : (
          <div className='text-sm text-center flex w-full'>
            {/*  <span>Войти  —</span>{' '} */}
            <Link className='flex w-full justify-end' href='/login'>
              <Button variant={'link'}>Войти или зарегистрироваться</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionForm
