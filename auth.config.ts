import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      //Pude hacerlo funcionar, debo cambiar esta logica y adaptarla a mi app.
      // Debo hacer una lista de rutas protegidas y en base a eso ir verificando
      // Imagino que las de home, auth y consultas de productos seran publicas
      // Y que las de perfil, compras, comprar, paga, etc seran privadas.
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnSignin = nextUrl.pathname.startsWith('/auth/signin');
      const isOnSignout = nextUrl.pathname.startsWith('/auth/signout');

      //Tengo que ver porque no sabe que hacer cuando retorno false.
      if (!isLoggedIn && isOnDashboard) return Response.redirect(new URL('/auth/signin', nextUrl));

      if (isLoggedIn && isOnSignin) return Response.redirect(new URL('/dashboard', nextUrl));

      if(!isLoggedIn && isOnSignout) return Response.redirect(new URL('/', nextUrl));
      /* const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      } */
      return true;
    },
    jwt({ token, user }) {
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