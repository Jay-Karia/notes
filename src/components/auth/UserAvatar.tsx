import { auth } from "@/auth";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <Image className="rounded-full" src={session.user.image as string} height={25} width={25} alt="User Avatar"/>
    </div>
  );
}
