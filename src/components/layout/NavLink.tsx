"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { HomeIcon } from "../icons/home-icon";
import { DashboardIcon } from "../icons/dashboard-icon";

export default function NavLink() {
  const router = useRouter();

  return (
    <header className="w-full px-4 py-4 sm:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-blue-200/80 px-6 py-3 shadow-lg shadow-blue-200/50 backdrop-blur-sm sm:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0">
            <div className="absolute top-0 left-0 h-10 w-10 rounded-lg bg-blue-500 shadow-md" />
            <div className="absolute right-0 bottom-0 h-6 w-6 rounded-md bg-white shadow-soft" />
          </div>
          <h1 className="font-serif text-3xl font-bold italic sm:text-4xl">
            Fortis <span className="text-blue-600">Libertas</span>
          </h1>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-10 md:flex">
          <li>
            <Link
              href="/"
              className="flex flex-row justify-center items-center gap-x-2.5 text-lg font-semibold text-brand transition-colors hover:bg-brand hover:text-white p-2 rounded-sm"
            >
              <HomeIcon size="lg" variant="secondary"/> Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="flex flex-row justify-center items-center gap-x-2.5 text-lg font-semibold text-brand transition-colors hover:bg-brand hover:text-white p-2 rounded-sm"
            >
              <DashboardIcon size="lg" variant="secondary"/> Dashboard
            </Link>
          </li>
        </ul>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="primary"
            onClick={() => router.push("/login")}
            className="rounded-full px-8 py-2"
          >
            Login
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => router.push("/signup")}
            className="rounded-full px-8 py-2"
          >
            Signup
          </Button>
        </div>
      </nav>
    </header>
  );
}
