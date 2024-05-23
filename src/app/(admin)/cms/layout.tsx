import { Metadata } from 'next'
import { sideMenuAdminCMS, sideMenuCMS } from '../_lib/helpers/side-menu-cms'
import AdminBar from '../_ui/admin-bar'
import SideBarCMS from '../_ui/side-bar-admin'

export const metadata: Metadata = {
  title: 'CMS Фиори ',
  description: 'CMS shop'
}
export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='w-full min-h-svh flex flex-col'>
      <AdminBar />
      <div className='flex-1 flex flex-row'>
        <aside className='flex  py-2 px-2'>
          <SideBarCMS menuManager={sideMenuCMS} menuAdmin={sideMenuAdminCMS} />
        </aside>
        <div className='flex flex-1 '>{children}</div>
      </div>
    </section>
  )
}
