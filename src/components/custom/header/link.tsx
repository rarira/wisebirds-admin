"use client";
import { cn } from "@/components/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderLinkProps = {
  href: string;
  children: React.ReactNode;
};

function HeaderLink({ children, href }: HeaderLinkProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex font-bold text-lg px-4 h-full items-center justify-center",
        pathname === href ? "bg-focused" : ""
      )}
    >
      {children}
    </Link>
  );
}

export default HeaderLink;
