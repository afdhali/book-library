"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Header = () => {
  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/sign-in", // redirect ke halaman sign-in setelah logout
    });
  };

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Button onClick={handleSignOut}>Logout</Button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
