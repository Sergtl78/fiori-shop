import { Button } from '@/components/ui/button'

type Props = {}

const CartPage = (props: Props) => {
  return (
    <div className='container flex flex-col md:flex-row w-full'>
      <div className='w-full flex-1 flex-col gap-4'>
        <h1>Корзина</h1>
      </div>
      <div className='w-full flex flex-col max-w-sm'>
        <h1>Заказ</h1>
        <p>Количество наименований</p>
        <p>На сумму:</p>
      </div>
      <Button>Отправить заказ</Button>
    </div>
  )
}

export default CartPage
