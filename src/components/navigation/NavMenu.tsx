import Link from 'next/link'
import { Button } from '../ui/button'

const NavMenu = async () => {
  const menuLink = [
    {
      id: 1,
      title: 'Каталог',
      url: '/catalog'
    }
  ]
  return (
    <ul className='hidden md:flex flex-row items-center justify-center gap-4'>
      {menuLink?.map(
        link =>
          link && (
            <li key={link.id + link.title}>
              <Link href={link.url}>
                <Button className='' variant={'ghost'}>
                  {link.title}
                </Button>
              </Link>
            </li>
          )
      )}
    </ul>
  )
}

export default NavMenu
