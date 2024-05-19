import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  data: {
    id?: string |null
    slug?: string
    name?: string
    title?: string
  } | null
  pathUrl: string
  isSlug?: boolean
  className?: string
}

const ButtonLinkTable = ({ data, pathUrl, isSlug, className }: Props) => {
  return (
    <Link
      href={data?.slug ? `${pathUrl}/${data?.slug}` : `${pathUrl}/${data?.id}`}
      className={cn(
        buttonVariants({ variant: 'link', size: 'sm' }),
        'w-full justify-start text-left text-foreground text-sm',
        className
      )}
    >
      {isSlug ? data?.slug : data?.name}
    </Link>
  )
}

export default ButtonLinkTable
