import { formatDate } from '@/lib/utils'
import { getProductBySlug } from '../../_lib/api/product'
import CollectionsIconsList from '../../catalog/_ui/collections-icons-list'
import CarouselProduct from '../_ui/carousel/carousel-product'
import DescriptionProduct from '../_ui/description-product'
import Counter from '../_ui/page-counter'

type Props = {
  params: {
    slug: string
  }
}

const ProductPage = async ({ params }: Props) => {
  const product = await getProductBySlug(params.slug)

  return (
    <section className='container'>
      <div className='grid grid-cols-1 md:grid-cols-3 w-full pt-8'>
        <div className='col-span-1'>
          <CarouselProduct slides={product?.images ?? []} />
        </div>
        <div className='col-span-2 md:pl-8'>
          <div className='flex flex-col w-full gap-4'>
            <div className='flex flex-row'>
              <h1>{product?.name}</h1>
              <CollectionsIconsList product={product} />
            </div>
            <div className='flex flex-col gap-2'>
              <p>Доступно: {product?.quantity} шт.</p>
              <p>Количество в упаковке: {product?.min_quantity} шт.</p>
              <p>Рост: {product?.growth} см.</p>
              {product?.delivery && (
                <p>Доставка: {formatDate(product.delivery)}</p>
              )}
            </div>
            <h4 className=''>Добавить в корзину</h4>
            {product && <Counter product={product} />}
            <DescriptionProduct description={product?.description ?? ''} />
          </div>
        </div>
      </div>
      {/* <RecommendSlider
    sub_categoryId={product?.attributes?.sub_category?.data?.id || ''}
  /> */}
    </section>
  )
}

export default ProductPage
