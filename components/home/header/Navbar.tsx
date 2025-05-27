import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import SearchInput from "./search-input";
import ToggelMode from "./toggel-mode";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/950 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* left section */}
          <div className="flex items-center gap-8">
            <Link href={"/"} className="flex items-center space-x-2">
              <span className="font-bold text-2xl">
                <span className="bg-gradient-to-t from-purple-600 to bg-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Yas
                </span>
                <span className="text-foreground">Blog</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={"/articles"}
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground"
            >
              Articles
            </Link>
            <Link
              href={"/tutorial"}
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground"
            >
              Tutorials
            </Link>
            <Link
              href={"/about"}
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href={"/dashboard"}
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          </div>
          {/* Right section  */}
          <div className="flex items-center gap-4">
            <SearchInput />
            <ToggelMode/>
            <div className="hidden md:flex items-center gap-2">
              <Button>Login</Button>
              <Button>Signup</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
