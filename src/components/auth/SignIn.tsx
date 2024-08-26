import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant={"secondary"} size={"sm"} type="submit">
        <FcGoogle className="mr-2 h-6 w-4" />
        Sign In
      </Button>
    </form>
  );
}
