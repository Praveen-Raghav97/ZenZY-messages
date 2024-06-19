"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navabar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex  md:flex-row justify-between items-center">
        <a href="#" className="text-2xl font-bold mb-4 md:mb-0 sm:text-3xl">
          ZenZY 
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome , {user?.username || user?.email}
            </span>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-900 text-white"
              variant="outline"
            >
              LogOut
            </Button>
          </>
        ) : (
          <Link href="/sign-up">
            <Button
              className="w-full md:w-auto bg-slate-900 text-white"
              variant={"outline"}
            >
              
              SignUp
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navabar;
