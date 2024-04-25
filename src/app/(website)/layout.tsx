import '@/style/global.css'
import type { Metadata } from 'next'
import Footer from './_ui/navigation/footer'
import MobileNav from './_ui/navigation/mobile-nav'
import Navbar from './_ui/navigation/navbar'

export const metadata: Metadata = {
  title: 'Фиори торговая площадка',
  description: 'Цветы на любой вкус, оптом в Нижнем Новгороде'
}

export default function WebsiteLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
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
