import { cn } from '@/lib/utils'
import Link from 'next/link'
import { LogoIcon } from './icon'

type Props = {
  className?: string
}

const Logo = ({ className }: Props) => {
  return (
    <Link href={'/'}>
      <LogoIcon className={cn('w-fit fill-secondary h-8 ', className)} />
    </Link>
  )
}

export default Logo
