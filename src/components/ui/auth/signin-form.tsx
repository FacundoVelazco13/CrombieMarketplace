import SignInCredentials from './sign-in-credentials';
import SignInGithub from './sign-in-github';
export default function SignInForm() {
  return (
    <div className='space-y-4'>
      {/* aca podria introducir algun encabezado */}
      <SignInCredentials/>
      <SignInGithub/>
    </div>
  );
}
