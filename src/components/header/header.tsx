import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="header">
      <a href="https://production.void.gg/">
        <Image alt="Void GG" src="/logo.svg" width={66} height={20}></Image>
      </a>
      <Link href="/dashboard">
        Dashboard
      </Link>
      <Link href="/posts">
        Posts
      </Link>
    </div>
  );
}
