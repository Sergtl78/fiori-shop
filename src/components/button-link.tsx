import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'
import { buttonVariants } from './ui/button'

type Props = {
  href: string
  children: ReactNode
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'tertiary'
    | 'ghost'
    | 'link'
    | null
    | undefined
  className?: string
}

const ButtonLink = ({
  href,
  children,
  variant = 'default',
  className
}: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: variant, size: 'sm' }),
        className
      )}
    >
      {children}
    </Link>
  )
}

export default ButtonLink
