import Link from 'next/link'
import { ReactNode } from 'react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import { LoginButton } from './LoginButton'

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
        <div className='flex mb-4 w-full justify-end'>
          <Link href={callbackUrl ?? '/'}>
            <Button
              variant={'link'}
              className=' active:scale-y-95'
              type='submit'
            >
              Назад
            </Button>
          </Link>
        </div>
        <h2 className='text-center text-2xl mb-4'>
          {typeForm === 'login' ? 'Войдите' : 'Зарегистрируйтесь'}
        </h2>
        {children}
        <LoginButton className='w-full' provider='google' />
        <div className='flex flex-row gap-2 mb-4'>
          <Checkbox checked={true} />
          <div className='text-sm'>
            <span>Соглашаюсь с </span>{' '}
            <Link className='hover:text-primary' href='/personalPolicy'>
              правилами пользования
            </Link>
            <span> торговой площадкой и возврата.</span>
          </div>
        </div>
        {typeForm === 'login' ? (
          <div className='text-sm text-center'>
            <span>Если нет аккаунта —</span>{' '}
            <Link
              className='hover:text-primary underline underline-offset-4'
              href='/register'
            >
              регистрация
            </Link>
          </div>
        ) : (
          <div className='text-sm text-center'>
            <span>Есть аккаунт —</span>{' '}
            <Link
              className='hover:text-primary underline underline-offset-4'
              href='/login'
            >
              войдите
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionForm
