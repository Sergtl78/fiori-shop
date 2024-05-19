import ButtonAppMenu from './button-app-menu'

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
              <ButtonAppMenu url={link.url} title={link.name} />
            </li>
          )
      )}
    </ul>
  )
}

export default NavMenu
