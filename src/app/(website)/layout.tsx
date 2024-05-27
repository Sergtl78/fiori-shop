import '@/style/global.css'
import { auth } from 'auth*'
import type { Metadata } from 'next'
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

  return (
    <main className='relative flex min-h-svh flex-1 flex-col font-sans'>
      <Navbar />

      {children}

      <Footer />
      <MobileNav />
    </main>
  )
}
