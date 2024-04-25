import { createId } from '@paralleldrive/cuid2'

import { getProducts } from '@/app/(website)/_lib/api/product'
import ProductList from '@/app/(website)/catalog/_ui/product-list'
import SearchProduct from '@/app/(website)/catalog/_ui/search-product'
import FiltersSheet from '../../_ui/navigation/filters-sheet'

type Props = {
  params: {
    slug: string[] | undefined
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const { products } = await getProducts({})
  let res: { slug: string[] }[] = []

  products.forEach(product => {
    res.push({
      slug: [
        product.Main_category?.slug || '',
        product.Category?.slug || '',
        product.Sub_category?.slug || ''
      ]
    })
  })

  return res
}
const Page = async ({ params, searchParams }: Props) => {
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined
  const vendorsSlugs =
    typeof searchParams.vendorsSlugs === 'string'
      ? searchParams.vendorsSlugs
      : undefined

  const colorsSlugs =
    typeof searchParams.colorsSlugs === 'string'
      ? searchParams.colorsSlugs
      : undefined

  const { products, totalProducts } = await getProducts({
    search,
    main_category_slug: params.slug?.[0],
    category_slug: params.slug?.[1],
    sub_category_slug: params.slug?.[2],
    vendor_slug: vendorsSlugs,
    color_slug: colorsSlugs
  })

  return (
    <section className=''>
      <div className='container my-8'>
        <div className='mb-8 flex flex-col md:flex-row w-full items-center justify-between gap-4'>
          <h1 className='text-3xl font-semibold '>Цветы оптом</h1>
          <div className='flex flex-row gap-4 items-center'>
            <div className='hidden md:block'>
              <FiltersSheet />
            </div>
            <SearchProduct search={search} />
          </div>
        </div>

        {products?.length === 0 && (
          <div className='flex w-full items-center justify-center'>
            <h2 className='text-center '>Товары не найдены</h2>
          </div>
        )}
        <ul
          key={createId()}
          role='list'
          className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-4
           lg:grid-cols-5 xl:gap-x-6'
        >
          <ProductList
            slug={params.slug}
            search={search}
            initialProducts={products}
            count={totalProducts}
            vendorsSlugs={vendorsSlugs}
            colorsSlugs={colorsSlugs}
          />
        </ul>
      </div>
    </section>
  )
}

export default Page
