"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink() {
  return (
    <nav className="flex flex-row justify-evenly items-center bg-blue-100">
      {/* Logo */}
      <div className="flex items-center min-h-24 gap-8">
        <div className="relative w-12 h-12 shrink-0">
          <div className="absolute top-0 left-0 w-10 h-10 rounded-lg bg-brand"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-md bg-white shadow-soft"></div>
        </div>
        <h1 className="font-serif italic text-4xl font-bold">
          Fortis <span className="text-blue-500">Libertas</span>
        </h1>
      </div>

      {/*  */}
      <ul>
        <li>
          Home
        </li>
        <li>
          Dashboard
        </li>
      </ul>

      {/*  */}

      <div>
        <button>Login</button>
        <button>Signup</button>
      </div>
    </nav>
  )
}
