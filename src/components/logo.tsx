import Link from 'next/link'
import LogoIcon3 from './icon/LogoIcon3'

type Props = {
  title: string
}

const Logo = ({ title }: Props) => {
  return (
    <Link href={'/'}>
      <div className='flex  flex-row items-center justify-start gap-4 py-4'>
        <LogoIcon3 name='logo' className='h-8 w-fit fill-secondary md:h-10 ' />
        {/* <h1 className='font-serif text-3xl font-semibold text-[#65B035] '>
          {title}
        </h1> */}
      </div>
    </Link>
  )
}

export default Logo
