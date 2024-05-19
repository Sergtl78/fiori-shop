import '@/style/global.css'
import { auth } from 'auth*'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getUserById } from './_lib/api/user'
import Footer from './_ui/navigation/footer'
import MobileNav from './_ui/navigation/mobile-nav'
import Navbar from './_ui/navigation/navbar'

export const metadata: Metadata = {
  title: 'Фиори торговая площадка',
  description: 'Цветы на любой вкус, оптом в Нижнем Новгороде'
}

export default async function WebsiteLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session || !session?.user || !session?.user?.id) redirect('/login')
  const user = await getUserById(session.user.id)
  /* if (!user) redirect('/login')
  if (user.blocked) redirect('/wait-admin')
  if (!user.tin && user.role === 'NEW') redirect('/user-update')
  if (user.tin && user.role === 'NEW' && session?.user) redirect('/wait-admin') */
  return (
    <>
      <Navbar />
      <section className='relative flex min-h-screen flex-1 flex-col font-sans'>
        {children}
      </section>
      <Footer />
      <MobileNav />
    </>
  )
}
