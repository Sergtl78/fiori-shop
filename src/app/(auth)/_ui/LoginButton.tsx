import { Button } from '@/components/ui/button'
import { EnterIcon } from '@radix-ui/react-icons'
import { providerMap, signIn } from 'auth'

export function LoginButton({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const providerData = providerMap.find(p => p.id === provider)

  return (
    <form
      className='mb-4'
      key={providerData?.id}
      action={async () => {
        'use server'
        await signIn(providerData?.id)
      }}
    >
      <Button type='submit' {...props}>
        <EnterIcon className='mr-2 h-4 w-4' />
        <span>{providerData?.name}</span>
      </Button>
    </form>
  )
}
