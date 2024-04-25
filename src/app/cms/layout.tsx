import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CMS Фиори ',
  description: 'CMS shop'
}
export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
