Marketplace desarrollado en NextJS.

### Cuestiones por implementar
* Introducir Rol en el modelo de User.
* Validaciones de zod mediante regex en las entradas signIn/signUp.
* Introduccion de imagen de perfil de usuario durante el registro.
* Introduccion de imagen de perfil de usuario posterior al registro.
* Mejorar el manejo de sign-in/sign-out, el tener dos providers requiere introducir verificar email ingresado al registrar usuario.
### Cuestiones a modificar
* La validacion de zod se realiza 2 veces durante el sign-in, dejarlo en un lugar definitivo (No genera nada malo, pero es innecesario).
