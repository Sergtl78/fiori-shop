'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

type Props = {
  url: string
  title: string
}

const ButtonAppMenu = ({ url, title }: Props) => {
  const pathName = usePathname()

  return (
    <Link href={url}>
      <Button
        className={
          pathName.startsWith(url)
            ? 'text-tertiary underline underline-offset-4'
            : ''
        }
        variant={'ghost'}
      >
        {title}
      </Button>
    </Link>
  )
}

export default ButtonAppMenu
