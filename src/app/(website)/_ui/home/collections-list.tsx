import { getCollections } from '../../_lib/api/collections'
import { SliderCollection } from '../sliders/slider-collection'

type Props = {
  collectionsSlugs?: string[]
}

const CollectionsList = async ({ collectionsSlugs }: Props) => {
  const collections = await getCollections({ collectionsSlugs })
  return (
    <section className='container flex flex-col w-full   h-full gap-4'>
      {collections.map(collection => (
        <SliderCollection key={collection.id} data={collection} />
      ))}
    </section>
  )
}

export default CollectionsList
