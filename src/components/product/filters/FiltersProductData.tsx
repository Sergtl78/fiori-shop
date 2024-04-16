import { forFiltersData } from '@/lib/api/for-filters'
import { Filters } from './Filters'

const FiltersProductData = async () => {
  const { mainCategories, categories, subCategories, vendors, colors } =
    await forFiltersData()

  return (
    <>
      <Filters
        mainCategories={mainCategories}
        categories={categories}
        subCategories={subCategories}
        vendors={vendors}
        colors={colors}
      />
    </>
  )
}

export default FiltersProductData
