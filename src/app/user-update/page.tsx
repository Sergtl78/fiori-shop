import { Separator } from '@/components/ui/separator'
import { auth } from 'auth*'
import Image from 'next/image'
import { UserProfileUpdateForm } from '../(website)/(user)/profile/_ui/form-user-profile-update'
import { getUserById } from '../(website)/_lib/api/user'

type Props = {}

const UserUpdatePage = async (props: Props) => {
  const session = await auth()
  if (!session?.user.id) return <p>Loading...</p>
  const user = await getUserById(session.user.id)
  if (!user) return <p>Loading...</p>
  return (
    <section className='min-h-svh relative container grid md:grid-cols-2 mb-8'>
      <div className='hidden md:flex relative aspect-square max-w-lg items-center justify-center w-full h-full '>
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/fiori_square.svg`}
          alt=''
          fill
          priority
          className='object-contain'
        />
      </div>
      <div className='w-full max-w-sm h-full '>
        <h2>Обновить профиль</h2>
        <p>Пожалуйста, обновите ваш профиль</p>
        <Separator className='my-4' />
        <UserProfileUpdateForm userId={user.id} user={user} />
      </div>
    </section>
  )
}

export default UserUpdatePage
