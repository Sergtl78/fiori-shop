import { getCollections } from '../../_lib/api/collections'
import { SliderCollection } from '../sliders/slider-collection'

type Props = {}

const CollectionsList = async (props: Props) => {
  const collections = await getCollections()
  return (
    <section className='container flex flex-col w-full   h-full gap-4'>
      {collections.map((collection, index) => (
        <SliderCollection key={collection.id} data={collection} />
      ))}
    </section>
  )
}

export default CollectionsList
