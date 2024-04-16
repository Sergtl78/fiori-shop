import { auth } from '~auth12'
import Logo from '../Logo'
import { ModeToggle } from '../ModeToggle'
import { AvatarUser } from './NavAvatarUser'
import NavMenu from './NavMenu'

const Navbar = async () => {
  const session = await auth()
  const user = session?.user
  console.log(session)

  //const mainCategories = await getMainCategoriesData()
  return (
    <>
      <nav className='main-gradient bg-background/90 sticky left-0 top-0 z-20 hidden h-16 w-full border-b border-border px-4 py-2 shadow md:flex md:h-20'>
        <div className='container flex items-center justify-between'>
          <Logo title='Фиори' />
          <NavMenu />
          <div className='flex flex-row items-center gap-4'>
            {/* {mainCategories && (
              <SearchNav mainCategories={mainCategories?.data} />
            )} */}
            {/* <CartSheet /> */}
            <AvatarUser user={user} />
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
