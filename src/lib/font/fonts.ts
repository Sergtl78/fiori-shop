import localFont from 'next/font/local'

export const roboto = localFont({
  src: [
    {
      path: './roboto/Roboto-Regular.ttf',
      weight: '400',
      style: 'regular'
    },
    {
      path: './roboto/Roboto-Italic.ttf',
      weight: '400',
      style: 'italic'
    },
    {
      path: './roboto/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: './roboto/Roboto-BoldItalic.ttf',
      weight: '700',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-roboto'
})

export const mark = localFont({
  src: [
    {
      path: './mark/MarckScript-Regular.ttf',
      weight: '400',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-mark'
})
/* export const mark = Marck_Script({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-mark',
  weight: '400'
}) */
