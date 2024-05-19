import { discountCollections, formatPrice, getOldPrice } from '@/lib/utils'
import { ResProductBySlug } from '../api/result-types'

export const getProductInfo = (product: ResProductBySlug) => {
  const discountRes = discountCollections(product.collections)
  const deliveryNotNull = product.delivery_items.filter(item => {
    if (item.quantity > 0 && item.Delivery?.statusDelivery !== 'REGISTERED')
      return item
  })
  const price =
    product.quantity > 0 ? product.price : deliveryNotNull[0]?.price ?? 0
  const currentPrice = formatPrice(price * product.min_quantity)

  return {
    currentPrice,
    oldPrice: getOldPrice({
      price: price * product.min_quantity,
      discount: discountRes
    }),
    deliveryNotNull,
    discountRes
  }
}
