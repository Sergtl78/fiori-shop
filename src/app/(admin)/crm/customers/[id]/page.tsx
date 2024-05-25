import ButtonAddRoleNew from '@/app/(admin)/_ui/form-items/button-add-role-new'
import ButtonAddRoleUser from '@/app/(admin)/_ui/form-items/button-add-role-user'
import SwitchBlockUserForm from '@/app/(admin)/_ui/form-items/switch-block-user-form'
import ButtonCreateUserShop from '@/app/(website)/(user)/profile/_ui/button-create-user-shop'
import ShopCard from '@/app/(website)/(user)/profile/_ui/shop-card'
import { getUserById, getUsers } from '@/app/(website)/_lib/api/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import ButtonUpdateUserCrm from '../_lib/api/button-update-user-crm'
import { changeBlockUser } from '../_lib/api/customers'

export async function generateStaticParams() {
  const users = await getUsers()

  return users.map(user => ({
    id: user.id
  }))
}
type Props = {
  params: { id: string }
}

const CustomerPage = async ({ params }: Props) => {
  const user = await getUserById(params.id)
  if (!user) return <div>404 Не найден пользователь</div>

  return (
    <section className='container w-full min-h-svh   mt-8'>
      <div className='w-full grid md:grid-cols-4 mb-8'>
        <div className='w-full flex flex-col border-r '>
          <div className='w-full flex flex-row gap-x-4 mb-4'>
            <Avatar className='w-20 h-20'>
              <AvatarImage
                src={user.avatar ?? (user.image || '')}
                alt={user?.name || 'Фото'}
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div className='w-full flex flex-col justify-center'>
              <p className='text-xl'>
                {user?.lastName} {user?.name}
              </p>
              <p className='text-xl'>{user?.middleName}</p>
            </div>
            <ButtonUpdateUserCrm user={user} userId={user?.id} />
          </div>

          <Link
            href={`mailto:${user?.email}`}
            className='hover:underline underline-offset-4  '
          >
            Email: {user?.email}
          </Link>
          <Link
            href={`tel:${user?.phone}`}
            className='hover:underline underline-offset-4  '
          >
            Телефон: {user?.phone}
          </Link>
          <p>ИНН: {user?.tin}</p>
          <p>Персональная скидка: {user?.personalDiscount}%</p>
          <p>Количество магазинов: {user?.shops.length}</p>
          <p>Роль пользователя: {user?.role}</p>
          <div className='w-full  flex items-center justify-between'>
            <p>Изменить роль на </p>
            {user?.role === 'NEW' ? (
              <ButtonAddRoleUser userId={user.id} />
            ) : (
              <ButtonAddRoleNew userId={user.id} />
            )}
          </div>

          <div className='w-full  flex items-center justify-between'>
            <p>Заблокировать пользователя</p>
            <SwitchBlockUserForm
              blocked={user.blocked}
              id={user.id}
              changeVisibleFN={changeBlockUser}
            />
          </div>

          <Separator className='my-4' />
          <section className='w-full flex flex-col gap-y-2'>
            <p className='text-xl'>Адреса магазинов</p>
            {user?.shops.map(shop => <ShopCard key={shop.id} shop={shop} />)}
            <ButtonCreateUserShop userId={user.id} />
          </section>
        </div>

        <div className='w-full flex md:col-span-3 '></div>
      </div>
    </section>
  )
}

export default CustomerPage
