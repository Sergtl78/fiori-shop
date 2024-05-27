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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-svh bg-background font-sans antialiased w-full',
          roboto.variable,
          mark.variable
        )}
      >
        <Provider>
          {children}

          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
