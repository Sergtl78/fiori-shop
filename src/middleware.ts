import { NextResponse } from 'next/server'
import { auth } from '../auth'

export default auth((request, _) => {
  if (request.auth?.user.blocked === true) {
    return NextResponse.rewrite(new URL('/wait-admin', request.url))
  }

  if (request.auth?.user.role === 'NEW') {
    return NextResponse.rewrite(new URL('/wait-admin', request.url))
  }

  if (
    request.nextUrl.pathname.startsWith('/cms' || '/crm') &&
    request.auth?.user.role !== 'ADMIN' &&
    request.auth?.user.role !== 'MANAGER'
  ) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
  if (!request.auth?.user.role) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }
})

export const config = {
  matcher: [
    '/cms',
    '/crm',
    '/((?!api|_next/static|_next/image|favicon.ico|fiori_square.svg|login|login_password|verify_email).*)'
  ]
}
