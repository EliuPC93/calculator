import type { NextRequest } from 'next/server'
 
export default function middleware(request: NextRequest) {
  const currentToken = request.cookies.get('token')?.value
 
  if (currentToken && !request.nextUrl.pathname.startsWith('/operations')) {
    return Response.redirect(new URL('/operations', request.url))
  }
 
  if (!currentToken && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
