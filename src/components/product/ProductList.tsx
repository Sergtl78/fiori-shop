'use client'
import { getProducts, ResProduct } from '@/lib/api/product'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from '../ui/skeleton'
import CardProduct from './CardProduct'

type ProductListProps = {
  search: string | undefined
  initialProducts: ResProduct[] | undefined
  count?: number
}

const ProductList = ({ search, initialProducts, count }: ProductListProps) => {
  const [products, setProducts] = useState(initialProducts)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  const isShowLoadMore = !!count && (products?.length ?? 0) < count

  const loadMoreProducts = useCallback(async () => {
    const next = page + 1
    const { products } = await getProducts({ search, page: next })
    if (products?.length) {
      setPage(next)
      setProducts((prev: ResProduct[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...products
      ])
    }
  }, [page, search])

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
