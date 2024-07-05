import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const currentToken = request.cookies.get('token')?.value

	if (!currentToken && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/signup')) {
		return Response.redirect(new URL('/login', request.url))
	}

	if (currentToken) {
		return NextResponse.next()
	}

}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
