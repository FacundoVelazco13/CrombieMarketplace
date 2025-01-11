import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

//Configuracion anterior.
/* export default NextAuth(authConfig).auth; */

const { auth } = NextAuth (authConfig)

//Nueva configuracion, de esta manera puedo añadir logica al middleware que me brinda auth.js.
export default auth(async (req) => {
  //middleware logic.
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|api/auth|_next/static|_next/image|.*\\.png$).*)'],
};