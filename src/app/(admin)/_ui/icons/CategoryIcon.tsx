import { SVGProps } from 'react'

export function CategoryIcon(props: SVGProps<SVGSVGElement>) {
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
        d='M3 13a9 9 0 0 0 9 9a9 9 0 0 0-9-9m2.44 2.44c1.91.71 3.41 2.21 4.12 4.12a7 7 0 0 1-4.12-4.12M12 22a9 9 0 0 0 9-9a9 9 0 0 0-9 9m2.42-2.43a6.88 6.88 0 0 1 4.15-4.15a7.03 7.03 0 0 1-4.15 4.15M12 14a6 6 0 0 0 6-6V3a5.9 5.9 0 0 0-2.16.39c-.55.23-1.04.57-1.45 1L12 2L9.61 4.39c-.41-.43-.9-.77-1.45-1A5.9 5.9 0 0 0 6 3v5a6 6 0 0 0 6 6M8 5.61l1.57 1.65L12 4.83l2.43 2.43L16 5.61V8a4 4 0 0 1-4 4a4 4 0 0 1-4-4z'
      ></path>
    </svg>
  )
}
