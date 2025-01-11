import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/src/components/ui/button";
import { signInActionGithub } from "@/src/lib/actions/auth/auth-actions";

export default function SignInGithub() {
  return (
    <form
      action={signInActionGithub}
    >
      <div className="rounded-lg bg-ebony-400 p-2 pb-2">
        <Button type="submit" className="mt-4 w-full">
          Signin with GitHub <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
