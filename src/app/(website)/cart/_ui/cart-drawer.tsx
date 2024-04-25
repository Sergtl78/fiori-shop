import AppDrawer from '@/components/app-drawer'
import { CartIcon } from '@/components/icon/CartIcon'
import CloseDrawer from '../../_ui/navigation/close-drawer'
import CartList from './cart-list'
import SendOrder from './send-order'

type Props = {}

const CartDrawer = (props: Props) => {
  return (
    <AppDrawer icon={<CartIcon className='h-8 w-8' />} footer={<CloseDrawer />}>
      <>
        <CartList inDrawer={true} />
        <SendOrder />
      </>
    </AppDrawer>
  )
}

export default CartDrawer
