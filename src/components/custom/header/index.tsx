"use client";

import Link from "next/link";
import Image from "next/image";
import HeaderMenu from "./link";
import HeaderProfile from "./profile";
import HeaderRoleMenu from "./role-menu";
import { useRoleStore } from "@/lib/store";

function Header() {
  const role = useRoleStore((state) => state.role);

  return (
    <nav
      className={`fixed top-0 flex w-full h-12 min-w-4xl bg-primary text-white px-4 flex-row justify-between items-center z-10`}
    >
      <div className="flex flex-1 gap-4 flex-row h-full items-center">
        <Link
          href="/"
          replace
          className="flex items-center justify-centerm mr-4"
        >
          <Image
            src="/logo.png"
            width={64}
            height={22}
            alt="Wisebirds Logo"
            className="filter grayscale brightness-[1000%]"
          />
        </Link>
        <HeaderMenu href="/">캠페인</HeaderMenu>
        {role === "admin" && <HeaderMenu href="/users">사용자</HeaderMenu>}
      </div>
      <div className="flex gap-4 flex-row">
        <HeaderProfile />
        <HeaderRoleMenu />
      </div>
    </nav>
  );
}

export default Header;
