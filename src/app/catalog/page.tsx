import { createId } from '@paralleldrive/cuid2'

import ProductList from '@/components/product/ProductList'
import SearchProduct from '@/components/product/SearchProduct'
import { getProducts } from '@/lib/api/product'

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const {products, totalProducts} = await getProducts({ search })

  return (
    <section className=''>
      <div className='container my-8'>
        <div className='mb-8 flex flex-col md:flex-row w-full items-center justify-between gap-4'>
          <h1 className='text-3xl font-semibold '>Цветы оптом</h1>

          <SearchProduct search={search} />
        </div>

        <ul
          key={createId()}
          role='list'
          className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-4
           lg:grid-cols-5 xl:gap-x-6'
        >
          <ProductList search={search} initialProducts={products} count={totalProducts} />
        </ul>
      </div>
    </section>
  )
}

export default Page
