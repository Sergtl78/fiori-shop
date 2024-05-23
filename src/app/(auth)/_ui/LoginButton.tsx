import { Button } from '@/components/ui/button'
import { providerMap, signIn } from 'auth'
import { GoogleIcon } from './icon/GoogleIcon'
import { VkIcon } from './icon/VkIcon'
import { YandexIcon } from './icon/YandexIcon'

export function LoginButton({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const providerData = providerMap.find(p => p.id === provider)
  console.log(providerData)

  return (
    <form
      className='mb-4 w-full'
      key={providerData?.id}
      action={async () => {
        'use server'
        await signIn(providerData?.id)
      }}
    >
      <Button
        variant={'outline'}
        type='submit'
        {...props}
        className='w-full gap-4'
      >
        <span>Войдите с </span>
        {providerData?.id === 'google' && <GoogleIcon className='h-5 w-5' />}
        {providerData?.id === 'vk' && (
          <VkIcon className='h-6 w-6 text-blue-500' />
        )}
        {providerData?.id === 'yandex' && (
          <YandexIcon className='h-4 w-4 text-red-500' />
        )}
        {/* <EnterIcon className='mr-2 h-4 w-4' /> */}
      </Button>
    </form>
  )
}
