import AppDrawer from '@/components/app-drawer'
import { CartIcon } from '@/components/icon/CartIcon'
import Link from 'next/link'
import { Button } from 'react-day-picker'
import CartList from './cart-list'
import SendOrder from './send-order'
import UserShop from './user-shop'

type Props = {}

const CartDrawer = (props: Props) => {
  return (
    <AppDrawer icon={<CartIcon className='h-8 w-8' />}>
      <>
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
      </>
    </AppDrawer>
  )
}

export default CartDrawer
