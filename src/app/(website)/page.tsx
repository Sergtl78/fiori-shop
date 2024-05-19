import { CheckIcon } from '@radix-ui/react-icons'
import { getSlider_promo } from './_lib/api/slider_promo'
import CollectionsList from './_ui/home/collections-list'
import SliderPromo from './_ui/sliders/slider-promo'

export default async function Home() {
  const slider = await getSlider_promo()
  return (
    <div className='container flex flex-col w-full   min-h-[70vh] gap-4 '>
      <div className='flex  md:flex-row w-full items-center justify-center flex-col-reverse'>
        <div className='w-full h-full flex flex-col items-start justify-center md:ml-4 text-center '>
          <h3 className='font-serif text-center md:text-start w-full  mb-4'>
            Добро пожаловать в мир цветов 🌹
          </h3>
          <h1>
            <span className='text-primary'>Fiori</span> — цветочная компания{' '}
          </h1>
          <h4 className='mb-6 mt-4'>Продажа цветов оптом в Нижнем Новгороде</h4>
          <div className='flex'>
            <CheckIcon className='w-6 h-6 text-secondary' />
            <h3 className='font-serif text-start'>
              Красивые цветы на любой вкус.
            </h3>
          </div>
          <div className='flex '>
            <CheckIcon className='w-6 h-6 text-secondary ' />
            <h3 className='font-serif text-start'>
              Самые низкие цены в Нижнем Новгороде
            </h3>
          </div>
          <div className='flex '>
            <CheckIcon className='w-6 h-6 text-secondary' />
            <h3 className='font-serif text-start'>
              Индивидуальный подход к каждому клиенту
            </h3>
          </div>
        </div>
        <div className='w-full my-6 '>
          <SliderPromo data={slider} />
        </div>
      </div>

      <CollectionsList collectionsSlugs={['action', 'top-seller']} />
    </div>
  )
}
