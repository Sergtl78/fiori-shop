export const translateColumnId = (columnId: string) => {
  switch (columnId) {
    case 'id':
      return 'ID'
    case 'slug':
      return 'Slug'
    case 'name':
      return 'Название'
    case 'title':
      return 'Заголовок'
    case 'visible':
      return 'Видимость'
    case 'url':
      return 'Ссылка'
    //user
    case 'User':
      return 'Пользователь'
    case 'userName':
      return 'Пользователь'
    case 'userId':
      return 'Пользователь'
    case 'firstName':
      return 'Имя'
    case 'lastName':
      return 'Фамилия'
    case 'middleName':
      return 'Отчество'
    case 'tin':
      return 'ИНН'
    case 'personalDiscount':
      return 'Скидка персональная'
    case 'email':
      return 'Email'
    case 'phone':
      return 'Телефон'
    case 'image':
      return 'Фото'
    case 'images':
      return 'Фото'
    case 'blocked':
      return 'Заблокирован'
    case 'role':
      return 'Роль'
    case 'Role':
      return 'Роль'
    case 'orders':
      return 'Порядок'
    case 'orders':
      return 'Заказы'
    case 'Order':
      return 'Заказы'
    case 'total_items':
      return 'Общее количество'
    case 'total_price':
      return 'Общая стоимость'
    case 'status':
      return 'Статус'
    //main_category  //category
    case 'nameMainCategory':
      return 'Главная категория'

    case 'categories':
      return 'Категории'

    case 'nameCategory':
      return 'Категория'

    case 'nameSubCategory':
      return 'Подкатегория'
    case 'sub_categories':
      return 'Подкатегории'
    case 'product':
      return 'Товар'
    case 'Product':
      return 'Товар'
    case 'products':
      return 'Товары'
    case 'nameProduct':
      return 'Товар'
    case 'imageProduct':
      return 'Фото'
    case 'quantityProduct':
      return 'Количество'
    case 'price':
      return 'Цена'
    case 'priceCartItem':
      return 'Цена'
    case 'growth':
      return 'Рост'
    case 'quantity':
      return 'Количество'
    case 'number_order':
      return 'Номер заказа'
    case 'order_items':
      return 'Товары'
    case 'statusOrder':
      return 'Статус'

    case 'min_quantity':
      return 'Минимальное количество'
    case 'delivery':
      return 'Поставка'
    case 'dateDelivery':
      return 'Поставка дата'
    case 'statusDelivery':
      return 'Поставка статус'
    case 'delivery_items':
      return 'Поставка'

    case 'nameVendor':
      return 'Поставщик'
    case 'vendors':
      return 'Поставщики'

    case 'nameColor':
      return 'Цвет'
    case 'colors':
      return 'Цвета'
    case 'textColor':
      return 'Цвет текста'
    case 'hex':
      return 'Цвет в HEX'
    case 'collections':
      return 'Коллекции'
    case 'Collection':
      return 'Коллекции'
    case 'collectionId':
      return 'Коллекции'
    case 'discount':
      return 'Скидка'
    case 'CartItem':
      return 'Корзина'
    case 'Cart_items':
      return 'Корзина'
    case 'cartItems':
      return 'Корзина'

    //address

    case 'address':
      return 'Адрес'
    case 'city':
      return 'Город'
    case 'street':
      return 'Улица'
    case 'house':
      return 'Дом'
    case 'building':
      return 'Корпус'

    case 'Shop':
      return 'Магазин'
    case 'shops':
      return 'Магазины'
    case 'shopId':
      return 'Магазин'
    case 'shopName':
      return 'Магазин'
    case 'userShop':
      return 'Магазин'
    case 'cart_items':
      return 'Количество наименований'
    case 'total_amount':
      return 'Количество товаров'
    case 'total_prise':
      return 'Общая стоимость'

    case 'description':
      return 'Описание'

    case 'createdAtFormatted':
      return 'Создано'
    case 'updatedAtFormatted':
      return 'Обновлено'
    default:
      return columnId
  }
}
