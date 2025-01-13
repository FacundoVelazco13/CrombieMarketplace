import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { SignInUserScheme } from "@/src/lib/zod/zod"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"
import bcrypt from 'bcrypt';
import { authConfig } from '@/auth.config';
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session : {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            //Credenciales que utilizo hasta el momento.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                const parsedData = SignInUserScheme.safeParse(credentials);

                if (!parsedData.success) {
                    throw new Error("Invalid credentials");
                }

                const { email, password } = parsedData.data;;

                user = await prisma.user.findFirst({
                    where: {
                        email: email,
                    },
                });

                if (!user) throw new Error("Invalid credentials");
                //bcrypt tiene una opcion de callback que podria usar en vez de los if de abajo.
                //En este punto, si existe el mail y no la password, podriamos loguear al usuario mediante alguno de sus metodos oAuth.
                //Debo tener en cuenta en el registro que si el usuario introduce un amil que ya existe podria enviarlo a loguearse con su provider.
                if (!user.password) throw new Error("Invalid credentials");
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (passwordsMatch) return user;
                else throw new Error("Invalid credentials");
            },
        }),
        GitHub
    ],
})