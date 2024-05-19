import { Button } from '@/components/ui/button'
import { discountCollections, formatPrice, getOldPrice } from '@/lib/utils'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { CartItem, useCartStore } from '../../_lib/state/cart-state'

type Props = {
  cartItem: CartItem
}

const CounterCart = ({ cartItem }: Props) => {
  const addFromCart = useCartStore(state => state.addFromCart)
  const removeFromCart = useCartStore(state => state.removeFromCart)

  const handleIncrement = () => {
    addFromCart(cartItem.product, 1)
  }
  const handleDecrement = () => {
    removeFromCart(cartItem.id, 1)
  }

  const discount = discountCollections(cartItem.product.collections)

  return (
    <div className='flex flex-col md:flex-row w-full justify-between items-center px-4 '>
      <div className='flex flex-row items-end space-x-4 justify-around w-full'>
        <div className='flex items-center justify-start gap-2'>
          <Button
            onClick={() => handleDecrement()}
            variant={'ghost'}
            size={'icon'}
          >
            <MinusIcon className='w-4 h-4' />
          </Button>
          <span className=' text-lg font-semibold outline-none text-center focus-visible:ring-transparent p-0 '>
            {cartItem.quantityInCart} x {cartItem.product.min_quantity}
          </span>
          <Button
            onClick={() => handleIncrement()}
            variant={'ghost'}
            size={'icon'}
          >
            <PlusIcon className='w-4 h-4' />
          </Button>
        </div>
        {cartItem && (
          <div className='flex flex-col '>
            {discount > 0 && (
              <p className='text-sm text-muted-foreground line-through'>
                {getOldPrice({
                  price: cartItem.priceCartItem,
                  discount: discount
                })}
              </p>
            )}
            <p className='text-lg font-semibold '>
              {formatPrice(cartItem.priceCartItem)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CounterCart
