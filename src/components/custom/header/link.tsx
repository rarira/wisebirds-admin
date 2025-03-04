import Link from "next/link";

type HeaderLinkProps = {
  href: string;
  children: React.ReactNode;
};

function HeaderLink({ children, href }: HeaderLinkProps): React.JSX.Element {
  return (
    <Link href={href} className="font-bold text-lg">
      {children}
    </Link>
  );
}

export default HeaderLink;
