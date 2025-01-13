import { signOutAction } from "@/src/lib/actions/auth/auth-actions"
 
export function SignOutForm() {
  return (
    <form
      action={signOutAction}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}