import { SVGProps } from 'react'

export function CancelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='m23 10l-.04.29l-2.06 7.41L12.2 9H15l-3-4.26l-1.68 2.38l-1.43-1.43l2.29-3.26a.997.997 0 0 1 1.65.01L17.42 9H22c.55 0 1 .45 1 1m-.89 11.46l-1.27 1.27l-1.81-1.81c-.17.05-.35.08-.53.08h-13c-.78 0-1.46-.45-1.79-1.1L1.1 10.44L1 10c0-.55.45-1 1-1h4.58l.22-.31L1.11 3l1.28-1.27zm-8.26-5.72l-2.59-2.59C10.5 13.44 10 14.16 10 15a2 2 0 0 0 2 2c.84 0 1.56-.5 1.85-1.26'
      ></path>
    </svg>
  )
}
