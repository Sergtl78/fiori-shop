import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = {
  image: {
    name: string
    url: string
  }
  priority?: boolean
  className?: string
}

const MediaImage = ({ image, className, priority = false }: Props) => {
  return (
    <div className={cn('w-full h-full relative', className)}>
      <Image
        src={image.url}
        alt={image.name}
        priority={priority}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw'
        className='object-cover'
      />
    </div>
  )
}

export default MediaImage
