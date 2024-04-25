import AppBar from '@/components/appbar'
import { Toaster } from '@/components/ui/toaster'
import { mark, roboto } from '@/lib/font/fonts'
import { cn } from '@/lib/utils'
import '@/style/global.css'
import type { Metadata } from 'next'
import Provider from './provider/Provider'

export const metadata: Metadata = {
  title: 'Фиори торговая площадка',
  description: 'Цветы на любой вкус, оптом в Нижнем Новгороде'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          roboto.variable,
          mark.variable
        )}
      >
        <Provider>
          <AppBar />

          <main className='relative flex min-h-screen flex-1 flex-col font-sans'>
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
