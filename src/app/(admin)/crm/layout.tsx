import { Metadata } from 'next'
import { sideMenuAdminCRM, sideMenuCRM } from '../_lib/helpers/side-menu-crm'
import AdminBar from '../_ui/admin-bar'
import SideBarAdmin from '../_ui/side-bar-admin'

export const metadata: Metadata = {
  title: 'CMS Фиори ',
  description: 'CMS shop'
}
export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='w-full min-h-[100svh] flex flex-col'>
      <AdminBar />
      <div className='flex-1 flex flex-row'>
        <aside className='flex  py-2 px-2'>
          <SideBarAdmin
            menuManager={sideMenuCRM}
            menuAdmin={sideMenuAdminCRM}
          />
        </aside>
        <div className='flex flex-1 '>{children}</div>
      </div>
    </section>
  )
}
