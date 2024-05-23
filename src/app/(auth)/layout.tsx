import '@/style/global.css'
import { auth } from 'auth*'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Фиори торговая площадка',
  description: 'Цветы на любой вкус, оптом в Нижнем Новгороде'
}

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (session && session.user) redirect('/')
  if (session?.user.blocked) redirect('/wait-admin')

  return (
    <>
      <section className='relative flex min-h-svh flex-1 flex-col font-sans'>
        {children}
      </section>
    </>
  )
}
