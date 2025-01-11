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
      console.log("authorized callback");
      console.log("auth: ", auth);
      const isLoggedIn = !!auth?.user;
      console.log("isLoggedIn: ", isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], //se definen en el archivo de auth.ts
  trustHost: true,
} satisfies NextAuthConfig;