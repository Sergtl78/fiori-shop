import AppSheet from '@/components/app-sheet'
import { CartIcon } from '@/components/icon/CartIcon'
import CartList from './cart-list'
import SendOrder from './send-order'

type Props = {}

const CartSheet = (props: Props) => {
  return (
    <AppSheet
      side='right'
      icon={<CartIcon className='h-8 w-8' />}
      classNameSheet=''
      footer={<SendOrder />}
    >
      <CartList inDrawer={true} />
      <SendOrder />
    </AppSheet>
  )
}

export default CartSheet
