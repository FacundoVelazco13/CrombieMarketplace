//Podria generar un archivo para cada schema despues.

import { object, string } from "zod"

//Podria tener algo relacionado a la imagen, no se como se agregaria, voy a probarlo. Empiezo con los basicos.
export type UserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
//Por ahora la seguridad de la contraseña y la cantidad de campos va a ser laxa, puedo ampliarla con el tiempo.
const UserFormSchema = object({
  id: string(),
  name: string({
    invalid_type_error: 'Por favor escriba un nombre.',
  }).min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El nombre no debe tener más de 50 caracteres.' }),
  email: string({
    invalid_type_error: 'Por favor escriba un email.',
  }).min(1, "Por favor escriba un email.")
    .email({ message: 'Por favor escriba un email válido.' }),
  password: string({ required_error: "Password is required" })
    .min(1, "Ingrese una contraseña")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña debe tener como maximo 32 caracteres"),
});

export const SignUpUserScheme = UserFormSchema.omit({ id: true });

export const SignInUserScheme = UserFormSchema.omit({ id: true, name: true });