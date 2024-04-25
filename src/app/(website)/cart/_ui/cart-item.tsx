'use client'
import MediaImage from '@/components/media=Image'
import { cn, discountCollections } from '@/lib/utils'
import { Cross1Icon } from '@radix-ui/react-icons'
import { CartItem, useCartStore } from '../../_lib/state/cart-state'
import CollectionsIconsList from '../../catalog/_ui/collections-icons-list'
import CounterCart from './counter-cart'

type Props = {
  item: CartItem
  inDrawer?: boolean
}

const CartItemComponent = ({ item, inDrawer }: Props) => {
  const removeItemCart = useCartStore(state => state.removeItemCart)
  const discount = discountCollections(item.collections)
  return (
    <div
      className={cn(
        'flex  w-full  gap-4 items-center border shadow-sm bg-card text-card-foreground rounded-lg p-4',
        inDrawer ? 'flex-col' : 'flex-row'
      )}
    >
      <div className='flex w-full flex-row gap-4 items-center justify-between'>
        <div className='flex flex-row w-full items-center  gap-4'>
          <div className='flex w-20 h-20 rounded-lg overflow-hidden flex-shrink-0'>
            <MediaImage
              className='w-20 h-20 aspect-square'
              image={{ name: item.images[0].name, url: item.images[0].url }}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            {item.collections && item.collections.length > 0 && (
              <div className='flex w-full flex-row gap-2 items-center justify-start'>
                <CollectionsIconsList product={item} />
                {discount > 0 && <span className='text-sm'>-{discount}%</span>}
              </div>
            )}

            <h4>{item.name}</h4>
          </div>
        </div>

        <Cross1Icon
          onClick={() => removeItemCart(item.id)}
          className='w-4 h-4 cursor-pointer'
        />
      </div>

      <CounterCart cartItem={item} />
    </div>
  )
}

export default CartItemComponent
