import { SignOutForm } from '../../../components/ui/auth/signout-form';

export default function SignOut() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Eliminar esta pagina luego, es solo para pruebas, el signOut podria ir en el Navbar */}
      <h1>Pagina destinada a probar la funcionalidad signOut</h1>
      <SignOutForm />
    </div>
  );
}
