import Link from 'next/link'
import LogoIcon2 from './icon/LogoIcon2'

type Props = {
  title: string
}

const Logo = ({ title }: Props) => {
  return (
    <Link href={'/'}>
      <div className='flex  flex-row items-center justify-start gap-4 py-4'>
        <LogoIcon2
          name='logo'
          className='h-8 w-8 fill-primary md:h-10 md:w-10'
        />
        <h1 className='font-serif text-3xl font-semibold text-[#65B035] '>
          {title}
        </h1>
      </div>
    </Link>
  )
}

export default Logo
