import Image from 'next/image'
import { ResProductBySlug } from '../../_lib/api/result-types'

type Props = {
  product: ResProductBySlug | null
}

const CollectionsIconsList = ({ product }: Props) => {
  return (
    <div className='flex flex-row gap-2  h-6 '>
      {product?.collections?.map(
        (collection, ind) =>
          collection?.icon && (
            <Image
              src={collection?.icon}
              alt={collection?.name}
              width={40}
              height={40}
              key={collection.name ?? '' + ind}
              className=' aspect-square h-6 w-6'
            />
          )
      )}
    </div>
  )
}

export default CollectionsIconsList
