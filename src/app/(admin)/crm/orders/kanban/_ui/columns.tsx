import Column from './column'

type Props = {}

const Columns = (props: Props) => {
  return (
    <div className='grid grid-cols-5 w-full h-full min-h-svh gap-2 '>
      <Column title='Новые' status='NEW' />
      <Column title='Подтверждено' status='CONFIRMED' />
      <Column title='Оплачено' status='PAID' />
      <Column title='В работе' status='PENDING' />
      <Column title='Выполнено' status='FULFILLED' />
    </div>
  )
}

export default Columns
