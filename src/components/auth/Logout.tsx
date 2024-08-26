import { signOut } from "@/auth";
import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" variant={"link"} size={"sm"}>
          Logout
        </Button>
      </form>
    </div>
  );
}
