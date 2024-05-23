import { LoginButton } from './LoginButton'
import { LoginEmailForm } from './login-form-email'

type Props = {}

const AuthProviderBlock = (props: Props) => {
  return (
    <div className='flex flex-col w-full items-center gap-2'>
      <LoginEmailForm />
      <LoginButton className='w-full' provider='google' />
      <LoginButton className='w-full' provider='vk' />
      <LoginButton className='w-full' provider='yandex' />
    </div>
  )
}

export default AuthProviderBlock
