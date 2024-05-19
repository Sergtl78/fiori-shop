import { Button } from '@/components/ui/button'
import { auth } from 'auth*'
import Link from 'next/link'
import { getUserShops } from '../../_lib/api/user'
import UserShopList from './user-shop-list'

type Props = {}

const UserShop = async (props: Props) => {
  const session = await auth()

  if (!session || !session.user || !session.user.id) return
  const shops = await getUserShops(session.user.id)
  return (
    <div className='container flex w-full'>
      {shops && shops.length > 0 && <UserShopList shops={shops} />}
      {(!shops || shops.length < 1) && (
        <div className='w-full flex flex-col gap-4 items-center'>
          <p className='text-destructive'>Нет сохраненных магазинов</p>
          <Link href={`/profile/${session.user.id}`} className='w-full '>
            <Button className='w-full '>Ввести магазин</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default UserShop
