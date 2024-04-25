import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CRM Фиори ',
  description: 'CRM shop'
}
export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
