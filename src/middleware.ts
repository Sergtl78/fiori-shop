import { auth } from '../auth'

export default auth((request, _) => {
  if (!request.auth) {
    const url = request.url.replace(request.nextUrl.pathname, '/login')
    return Response.redirect(url)
  }
  if (!request.auth?.user.role) {
    const url = request.url.replace(request.nextUrl.pathname, '/wait-admin')
    return Response.redirect(url)
  }

  if (request.auth?.user.blocked === true) {
    const url = request.url.replace(request.nextUrl.pathname, '/wait-admin')
    return Response.redirect(url)
  }

  if (request.auth?.user.role === 'NEW') {
    const url = request.url.replace(request.nextUrl.pathname, '/wait-admin')
    return Response.redirect(url)
  }

  if (
    request.nextUrl.pathname.startsWith('/cms' || '/crm') &&
    request.auth?.user.role !== 'ADMIN' &&
    request.auth?.user.role !== 'MANAGER'
  ) {
    const url = request.url.replace(request.nextUrl.pathname, '/')
    return Response.redirect(url)
  }
})

export const config = {
  matcher: [
    '/cms',
    '/crm',
    '/((?!api|_next/static|_next/image|favicon.ico|fiori_square.svg|login|login_password|verify_email).*)'
  ]
}
