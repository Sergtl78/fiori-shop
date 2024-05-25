import { NextResponse } from 'next/server'
import { auth } from '../auth'

export default auth((request, _) => {
  if (request.nextUrl.pathname.startsWith('/') && !request.auth) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }
  if (request.auth?.user.blocked === true) {
    return NextResponse.rewrite(new URL('/wait-admin', request.url))
  }

  if (
    request.nextUrl.pathname.startsWith('/cms' || '/crm') &&
    request.auth?.user.role !== 'ADMIN' &&
    request.auth?.user.role !== 'MANAGER'
  ) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  if (
    request.nextUrl.pathname.startsWith('/') &&
    (request.auth?.user.role === 'NEW' || !request.auth?.user.role)
  ) {
    if (request.auth?.user.tin) {
      return NextResponse.rewrite(new URL('/wait-admin', request.url))
    } else {
      return NextResponse.rewrite(new URL('/user-update', request.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|fiori_square.svg|login|login_password|verify_email).*)'
  ]
}
