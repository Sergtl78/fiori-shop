import AppDrawer from '@/components/app-drawer'
import { CartIcon } from '@/components/icon/CartIcon'
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
        <SendOrder />
      </>
    </AppDrawer>
  )
}

export default CartDrawer
