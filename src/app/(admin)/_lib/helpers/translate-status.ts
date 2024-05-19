export const translateStatus = (status: string) => {
  switch (status) {
    case 'NEW':
      return 'НОВЫЙ'
    case 'CONFIRMED':
      return 'ПОДТВЕРЖДЕН'
    case 'PAID':
      return 'ОПЛАЧЕН'
    case 'PENDING':
      return 'В РАБОТЕ'
    case 'FULFILLED':
      return 'ВЫПОЛНЕН'
    case 'CANCELLED':
      return 'ОТМЕНЕН'

    case 'ORDERED':
      return 'ЗАКАЗАНА'
    case 'REGISTERED':
      return 'ЗАРЕГИСТРИРОВАНА'
  }
}
