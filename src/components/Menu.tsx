import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import Link from "next/link";

import { CiMenuBurger } from "react-icons/ci";

export default function Menu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <CiMenuBurger size={14} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/login">Login</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/signup">Sign Up</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
