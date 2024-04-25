'use client'

import { IconEmail, IconTelegram } from '@/components/icon'
import { InstagramIcon } from '@/components/icon/Instagram'
import { PhoneIcon } from '@/components/icon/Phone'
import { PointIcon } from '@/components/icon/Point'
import { VkIcon } from '@/components/icon/VK'
import { WhatsappIcon } from '@/components/icon/Whatsapp'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

type Props = {}

const SocialContacts = (props: Props) => {
  return (
    <Card className='w-full flex flex-col mt-2 gap-2 pt-4'>
      <CardContent className=''>
        <CardTitle className='text-base w-full text-center'>Контакты</CardTitle>
        <CardDescription className='flex flex-col gap-1 mb-4 '>
          <Link
            href='tel:+78314142443'
            target='_blank'
            className='flex flex-row items-center gap-2'
          >
            <Button variant={'ghost'} size={'icon'}>
              <PhoneIcon className='h-6 w-6 fill-primary-foreground ' />
            </Button>
            <span>+7(831)-414-24-43</span>
          </Link>
          <Link
            href='mailto:info@fioriopt.ru'
            target='_blank'
            className='flex items-center flex-row gap-2'
          >
            <Button variant={'ghost'} size={'icon'}>
              <IconEmail className='h-6 w-6 fill-primary-foreground ' />
            </Button>
            <span>info@fioriopt.ru</span>
          </Link>
          <Link
            href='https://t.me/Fiori_flowersnn'
            target='_blank'
            className='flex items-center flex-row gap-2'
          >
            <Button variant={'ghost'} size={'icon'}>
              <IconTelegram className='h-7 w-7 fill-primary-foreground bg-blue-500 rounded-md' />
            </Button>
            <span>https://t.me/Fiori_flowersnn</span>
          </Link>
          <Link
            href='https://wa.me/79036022443'
            target='_blank'
            className='flex items-center flex-row gap-2'
          >
            <Button variant={'ghost'} size={'icon'}>
              <WhatsappIcon className='h-8 w-8 fill-primary-foreground ' />
            </Button>
            <span>+7(903)-602-24-43</span>
          </Link>
          <Link
            href='https://www.instagram.com/fiori_flowers#Fiori'
            target='_blank'
            className='flex items-center flex-row gap-2'
          >
            <Button variant={'ghost'} size={'icon'}>
              <InstagramIcon className='h-6 w-6 fill-primary-foreground ' />
            </Button>
            <span>fiori_flowers#Fiori</span>
          </Link>
          <Link
            href='https://yandex.ru/maps/org/fiori/1211486651/?ll=44.037356%2C56.282031&mode=search&sll=43.971438%2C56.282003&source=serp_navig&text=фиори%20нижний%20новгород%20цветы&z=12'
            target='_blank'
            className='flex items-center flex-row gap-2'
          >
            <Button variant={'ghost'} size={'icon'}>
              <PointIcon className='h-8 w-8 fill-primary-foreground ' />
            </Button>
            <span>Yandex Карты</span>
          </Link>
          <Link
            href='https://m.vk.com/public212421493'
            target='_blank'
            className='flex items-center flex-row gap-2'
          >
            <Button variant={'ghost'} size={'icon'}>
              <VkIcon className='h-7 w-7 fill-blue-500 ' />
            </Button>
            <span>@club212421493</span>
          </Link>
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default SocialContacts
