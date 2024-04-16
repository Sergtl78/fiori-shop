import { SVGProps } from 'react'

export default function IconTelegram(props: SVGProps<SVGSVGElement>) {
  return (
    <div className=' border-blue-500 p-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center '>
      <svg
        className={`fill-white`}
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M43.0999 19.1415C43.3335 17.6312 41.8976 16.4392 40.5547 17.0287L13.809 28.7715C12.8461 29.1943 12.9165 30.6531 13.9153 30.9711L19.4308 32.7276C20.4836 33.0628 21.6234 32.8894 22.5427 32.2543L34.9781 23.6631C35.3531 23.4039 35.7619 23.9372 35.4414 24.2674L26.4902 33.4961C25.6219 34.3914 25.7942 35.9085 26.8387 36.5634L36.8606 42.8481C37.9847 43.5529 39.4307 42.8449 39.6409 41.4864L43.0999 19.1415Z' />
      </svg>
    </div>
  )
}
