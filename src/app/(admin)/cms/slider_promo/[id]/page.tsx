import ButtonBack from '@/components/button-back'
import { getSliderById, getSliderPromosAdmin } from '../_lib/api/slider_promo'
import HeaderUpdateSlider from '../_ui/header-update-slider'

type Props = {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const slider = await getSliderPromosAdmin()

  return slider.map(item => ({
    id: item.id
  }))
}

const SliderPromoPage = async ({ params }: Props) => {
  const slider = await getSliderById(params.id)
  if (!slider) return <div>404</div>
  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />
      <div className='flex flex-row items-center gap-4'>
        <h2>Изменить слайд</h2>
      </div>
      <HeaderUpdateSlider data={slider} />
    </div>
  )
}
export default SliderPromoPage
