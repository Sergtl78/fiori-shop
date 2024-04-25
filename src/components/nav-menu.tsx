import Link from 'next/link'
import { Button } from './ui/button'

type Props = {
  menu: { id?: string; name: string; url: string }[]
}
const NavMenu = async ({ menu }: Props) => {
  return (
    <ul className='hidden md:flex flex-row items-center justify-center gap-4'>
      {menu?.map(
        link =>
          link && (
            <li key={link.id + link.name}>
              <Link href={link.url}>
                <Button className='' variant={'ghost'}>
                  {link.name}
                </Button>
              </Link>
            </li>
          )
      )}
    </ul>
  )
}

export default NavMenu
