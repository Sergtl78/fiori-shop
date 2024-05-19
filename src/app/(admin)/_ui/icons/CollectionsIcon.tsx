import { SVGProps } from 'react'

export function CollectionsIcon(props: SVGProps<SVGSVGElement>) {
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
        d='M8.115 16h10.77q.23 0 .423-.192t.192-.423V4.615q0-.23-.192-.423T18.885 4H17.5v6.115l-2-1.192l-2 1.192V4H8.115q-.23 0-.423.192t-.192.423v10.77q0 .23.192.423t.423.192m0 1q-.69 0-1.152-.462T6.5 15.385V4.615q0-.69.463-1.152T8.115 3h10.77q.69 0 1.152.463t.463 1.152v10.77q0 .69-.462 1.153T18.885 17zm-3 3q-.69 0-1.152-.462T3.5 18.385V6.615h1v11.77q0 .23.192.423t.423.192h11.77v1zM13.5 4h4zM8.115 4H7.5h12z'
      ></path>
    </svg>
  )
}
