import AppSheet from '@/components/app-sheet'
import { CartIcon } from '@/components/icon/CartIcon'
import { Button } from '@/components/ui/button'
import { auth } from 'auth*'
import Link from 'next/link'
import CartList from './cart-list'
import SendOrder from './send-order'
import UserShop from './user-shop'

type Props = {}

const CartSheet = async (props: Props) => {
  const session = await auth()
  return (
    <AppSheet
      side='right'
      icon={<CartIcon className='h-8 w-8' />}
      classNameSheet=''
      //footer={<SendOrder />}
    >
      <CartList inDrawer={true}>
        <UserShop />
      </CartList>
      {!session?.user.tin && (
        <div>
          <p className='text-destructive text-center'>
            Пожалуйста, заполните свои данные профиля для заказа
          </p>
          <Link href={`/profile/${session?.user.id}`} className='w-full  '>
            <Button className='w-full '>Заполнить профиль</Button>
          </Link>
        </div>
      )}
      <SendOrder />
    </AppSheet>
  )
}

export default CartSheet
