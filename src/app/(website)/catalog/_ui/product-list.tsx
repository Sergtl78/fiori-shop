'use client'
import { getProducts, ResProductBySlug } from '@/app/(website)/_lib/api/product'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from '../../../../components/ui/skeleton'
import CardProduct from './card-product'

type ProductListProps = {
  search: string | undefined
  initialProducts: ResProductBySlug[] | undefined
  count?: number
  slug: string[] | undefined
  vendorsSlugs?: string
  colorsSlugs?: string
}

const ProductList = ({
  search,
  initialProducts,
  count,
  slug,
  vendorsSlugs,
  colorsSlugs
}: ProductListProps) => {
  const [products, setProducts] = useState(initialProducts)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  const isShowLoadMore = !!count && (products?.length ?? 0) < count

  const loadMoreProducts = useCallback(async () => {
    const next = page + 1
    const { products } = await getProducts({
      search,
      page: next,
      main_category_slug: slug?.[0],
      category_slug: slug?.[1],
      sub_category_slug: slug?.[2],
      vendor_slug: vendorsSlugs,
      color_slug: colorsSlugs
    })
    if (products?.length) {
      setPage(next)
      setProducts((prev: ResProductBySlug[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...products
      ])
    }
  }, [colorsSlugs, page, search, slug, vendorsSlugs])

  useEffect(() => {
    if (inView) {
      loadMoreProducts()
    }
  }, [inView, loadMoreProducts])

  return (
    <>
      {products?.map(product => (
        <li key={product.sku}>
          <CardProduct data={product} />
        </li>
      ))}
      {/* loading spinner */}
      {isShowLoadMore && (
        <div ref={ref} className=''>
          <Skeleton className='w-full h-full bg-background' />
        </div>
      )}
    </>
  )
}

export default ProductList
