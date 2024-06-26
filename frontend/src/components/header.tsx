import Link from "next/link";
import { Package2 } from "lucide-react";
import { ModeToggle } from "./theme-switcher";

export function Header() {
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Task Management App</span>
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Task Management App
          </Link>
          <ModeToggle />
        </nav>
        <nav className="md:hidden flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Task Management App</span>
            </Link>
            <Link
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Task Management App
            </Link>
          </div>
          <ModeToggle />
        </nav>
      </header>
    </>
  );
}
