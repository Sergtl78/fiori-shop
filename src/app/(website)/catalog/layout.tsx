export default function CatalogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className='relative container flex min-h-screen w-full h-full flex-col font-sans'>
      {children}
    </section>
  )
}
