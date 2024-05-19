import { formatDate, formatPrice, getOldPrice } from '@/lib/utils'
import {
  getProductBySlug,
  getProducts,
  getProductsBySlugCategory
} from '../../_lib/api/product'
import { getProductInfo } from '../../_lib/helpers/getProductInfo'
import { SliderCollection } from '../../_ui/sliders/slider-collection'
import CollectionsIconsList from '../../catalog/_ui/collections-icons-list'
import CarouselProduct from '../_ui/carousel/carousel-product'
import DescriptionProduct from '../_ui/description-product'
import ProductPageCounter from '../_ui/page-counter'

type Props = {
  params: {
    slug: string
  }
}
export async function generateStaticParams() {
  const { products } = await getProducts({})

  return products.map(product => ({
    slug: product.slug
  }))
}
const ProductPage = async ({ params }: Props) => {
  const product = await getProductBySlug(params.slug)
  const productsSlider = await getProductsBySlugCategory(
    product?.Category?.slug
  )
  if (!product) return null

  const { currentPrice, oldPrice, deliveryNotNull, discountRes } =
    getProductInfo(product)
  return (
    <section className='container'>
      <div className='grid grid-cols-1 md:grid-cols-3 w-full pt-8 mb-8'>
        <div className='col-span-1'>
          <CarouselProduct slides={product?.images ?? []} />
        </div>
        <div className='col-span-2 md:pl-8'>
          <div className='flex flex-col w-full gap-4'>
            <div className='flex flex-row gap-4'>
              <h1>{product?.name}</h1>
              <CollectionsIconsList product={product} />
              {discountRes > 0 && (
                <div className='flex flex-row gap-10 items-center '>
                  <p>Скидка {discountRes}%</p>
                </div>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <p>Вид: {product.Category?.name}</p>
              <p>Рост: {product?.growth} см.</p>

              <div className='flex flex-col w-full max-w-sm items-start'>
                <p>Количество в упаковке: {product?.min_quantity} шт.</p>

                <p>Доступно:</p>
                <div className='flex flex-col w-full max-w-sm items-start'>
                  {product?.quantity > 0 && (
                    <div className='flex flex-row w-full items-center justify-between '>
                      <p>сейчас </p>
                      <p>
                        {Math.floor(product?.quantity / product?.min_quantity)}{' '}
                        уп.
                      </p>
                      <p>
                        по{' '}
                        {discountRes > 0 && (
                          <span className='line-through text-sm mx-2'>
                            {oldPrice}
                          </span>
                        )}{' '}
                        {formatPrice(product?.price * product?.min_quantity)}
                      </p>
                    </div>
                  )}

                  {deliveryNotNull.map(item => (
                    <div
                      key={item.id}
                      className='flex flex-row w-full  items-center justify-between'
                    >
                      <p>{formatDate(item.dateDelivery_item)}</p>
                      <p>{item.quantity / product.min_quantity} уп.</p>
                      <p>
                        по{' '}
                        {discountRes > 0 && (
                          <span className='line-through text-sm mx-2'>
                            {getOldPrice({
                              price: item.price * product.min_quantity,
                              discount: discountRes
                            })}
                          </span>
                        )}{' '}
                        {formatPrice(item.price * product.min_quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h4 className=''>Добавить в корзину</h4>
            {product && <ProductPageCounter product={product} />}

            {product?.description && (
              <DescriptionProduct description={product?.description ?? ''} />
            )}
          </div>
        </div>
      </div>
      <SliderCollection
        data={{
          name: 'Похожие товары',
          products: productsSlider,
          slug: product?.Category?.slug!,
          icon: null,
          id: product?.Category?.slug!,
          discount: 0,
          sort_order: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }}
      />
    </section>
  )
}

export default ProductPage
