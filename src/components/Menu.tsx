import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import Link from "next/link";
import SignInButton from "./auth/SignIn";

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
            <SignInButton />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
