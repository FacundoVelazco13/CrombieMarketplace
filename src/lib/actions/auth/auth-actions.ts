'use server';

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from 'bcrypt';
import { SignInUserScheme, SignUpUserScheme, UserState } from "../../zod/zod";
import { prisma } from "@/prisma/prisma";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//Podria extender esto y permitir ingreso de imagenes, pero lo dejo para despues.
export async function signUpAction(prevState: UserState, formData: FormData) {
    const state: UserState = {
        errors: {},
        message: "",
    };
    const validatedFields = SignUpUserScheme.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });
    if (!validatedFields.success) {
        state.errors = validatedFields.error.flatten().fieldErrors;
        state.message = "Error con algunos campos, no se pudo registrar el usuario.";
        return state;
    }
    const { name, email, password } = validatedFields.data;

    //Validaciones : el nombre no requiere ser unico, solo el mail. Prisma igualmente lo rebotaria, pero es bueno informarlo.  
    if (await prisma.user.findFirst({ where: { email: email } })) {
        state.errors = {
            email: ["El email ya esta registrado."],
        },
            state.message = "Error con algunos campos, no se pudo registrar el usuario.";
        return state
    }
    //Crear nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        },
    });
    revalidatePath('/auth/signin');
    redirect('/auth/signin');
}

//Estoy usando validacion de Zod 2 veces, debo definir bien donde la voy a utilizar.
export async function signInAction(prevState: string | undefined, formData: FormData) {
    let state: string = "";

    const validatedFields = SignInUserScheme.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        state = "Error con algunos campos, no se pudo loguear el usuario.";
        return state;
    }

    const { email, password } = validatedFields.data;

    try {
        //En este punto podria redirigir al usuario a donde quiero.
        await signIn('credentials', { email: email, password: password });
    } catch (error) {
        console.log("error instanceof AuthError: ", error instanceof AuthError);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CallbackRouteError':
                    state = 'Invalid credentials';
                    break;
                default:
                    state = 'Something went wrong';
                    break;
            }
        }else throw error;
        
    }
    return state;
}


export async function signOutAction() {
    console.log("ejecucion de signing out");
    await signOut();

}