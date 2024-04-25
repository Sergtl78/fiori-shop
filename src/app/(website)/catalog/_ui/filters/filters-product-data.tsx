import { getForFilters } from '@/app/(website)/_lib/api/for-filters'
import { Filters } from './filters'

const FiltersProductData = async () => {
  const { vendors, colors } = await getForFilters()

  return (
    <>
      <Filters vendors={vendors} colors={colors} />
    </>
  )
}

export default FiltersProductData
