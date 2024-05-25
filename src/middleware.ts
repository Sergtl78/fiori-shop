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
  if (!request.auth?.user.role) {
    return NextResponse.rewrite(new URL('/wait-admin', request.url))
  }
  if (request.auth?.user.role === 'NEW') {
    return NextResponse.rewrite(new URL('/wait-admin', request.url))
  }
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|fiori_square.svg|login|login_password|verify_email).*)'
  ]
}
//проверить
//https://devsergey.ru/api/auth/callback/resend?callbackUrl=https%3A%2F%2Fdevsergey.ru%2Fupdate_user&token=be4614c4e81131e1fb04fdc3c6ad913011db981e9470311419247bd74302ef3f&email=sergtl78%40gmail.com
