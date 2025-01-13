import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      //Provisorio.
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnSignin = nextUrl.pathname.startsWith('/auth/signin');
      const isOnSignout = nextUrl.pathname.startsWith('/auth/signout');
      const isOnProfile = nextUrl.pathname.startsWith('/profile');

      //Tengo que ver porque no sabe que hacer cuando retorno false.
      if (!isLoggedIn && isOnDashboard) return Response.redirect(new URL('/auth/signin', nextUrl));

      if (isLoggedIn && isOnSignin) return Response.redirect(new URL('/dashboard', nextUrl));

      if(!isLoggedIn && isOnSignout) return Response.redirect(new URL('/', nextUrl));

      if(!isLoggedIn && isOnProfile) return Response.redirect(new URL('/auth/signin', nextUrl));

      return true;
    },
    jwt({ token, user, trigger ,profile}) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    }
  },
  providers: [], //se definen en el archivo de auth.ts
  trustHost: true,
} satisfies NextAuthConfig;