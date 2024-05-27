import { getCollectionBySlug } from '@/app/(website)/_lib/api/collections'
import { getUserById, getUsers } from '@/app/(website)/_lib/api/user'
import { SliderCollection } from '@/app/(website)/_ui/sliders/slider-collection'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { auth } from 'auth*'
import { redirect } from 'next/navigation'
import ButtonCreateUserShop from '../_ui/button-create-user-shop'
import ButtonUpdateUser from '../_ui/button-update-user'
import ShopCard from '../_ui/shop-card'
import UserOrderBlock from '../_ui/user-order-block'

export async function generateStaticParams() {
  const users = await getUsers()

  return users.map(user => ({
    id: user.id
  }))
}
type Props = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const ProfilePage = async ({ params, searchParams }: Props) => {
  const session = await auth()
  if (!session || !session.user) redirect('/login')

  if (session.user.id !== params.id) redirect(`/profile/${session.user.id}`)

  const user = await getUserById(session.user.id)
  if (!user) redirect('/login')
  const collection = await getCollectionBySlug('recommendation')

  const page = typeof searchParams?.page === 'string' ? searchParams.page : '1'
  const pageSize =
    typeof searchParams?.pageSize === 'string' ? searchParams.pageSize : '2'

  return (
    <section className='container flex flex-col w-full min-h-svh   mt-10'>
      <div className='w-full  flex flex-col md:flex-row gap-6 mb-8'>
        <div className='md:w-1/4 w-full flex flex-col border-r '>
          <div className='w-full flex flex-row gap-x-4 mb-4'>
            <Avatar className='w-20 h-20'>
              <AvatarImage
                src={user.avatar || user.image || ''}
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
          </div>
          {!!user?.personalDiscount && user?.personalDiscount > 0 && (
            <p>Ваша скидка: {user?.personalDiscount}%</p>
          )}
          <p>Email; {user?.email}</p>
          <p>Телефон: {user?.phone}</p>
          <p>ИНН: {user?.tin}</p>
          <div className='w-full  flex items-center justify-end'>
            <ButtonUpdateUser user={user} userId={user.id} />
          </div>
          <Separator className='my-4' />
          <section className='w-full flex flex-col gap-y-2'>
            <p className='text-xl'>Адреса магазинов</p>
            {user?.shops.map(shop => <ShopCard key={shop.id} shop={shop} />)}
            <ButtonCreateUserShop userId={user.id} />
          </section>
        </div>

        <div className='w-full flex flex-1 '>
          <UserOrderBlock userId={user.id} page={page} pageSize={pageSize} />
        </div>
      </div>
      {collection && <SliderCollection data={collection} />}
    </section>
  )
}

export default ProfilePage
