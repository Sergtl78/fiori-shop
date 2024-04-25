'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      themes={['light', 'dark', 'rose', 'dark-rose','green','dark-green']}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
