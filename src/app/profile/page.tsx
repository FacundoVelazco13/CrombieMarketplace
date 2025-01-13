import { auth } from "@/auth";
import { checkProfile } from "@/src/lib/actions/profile/profile-actions";

export default async function Profile() {
  const session = await auth();
  if (!session) return null;
  const profile = await checkProfile(session?.user);
  console.log(profile);

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nombre: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Rol: {profile.role}</p>
    </div>
  );
}
