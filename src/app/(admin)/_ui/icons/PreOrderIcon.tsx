import { SVGProps } from 'react'

export function PreOrderIcon(props: SVGProps<SVGSVGElement>) {
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
        d='M12 4V2h10v2zm0 4V6h10v2zm0 4v-2h10v2zm6.95 10q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T2 5.05q0-.45.3-.75t.75-.3H7.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T8.4 9.45L5.975 11.9q.5.925 1.187 1.788t1.513 1.662q.775.775 1.625 1.438T12.1 18l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T20 16.9v4.05q0 .45-.3.75t-.75.3'
      ></path>
    </svg>
  )
}
