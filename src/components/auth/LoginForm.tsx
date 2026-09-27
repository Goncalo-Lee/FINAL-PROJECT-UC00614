"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signInAction } from '@/app/actions/auth';


export default function Login() {
  const router = useRouter();



  return (
    <form className="mt-12 space-y-9" action={signInAction}>
      {/* Email */}
      <div className="flex flex-col">
        <label className="block text-lg font-bold text-gray-900" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          autoComplete="email"
          required
          className="mt-3 block w-full h-12 rounded-lg bg-[#f6f6f6] px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="block text-lg font-bold text-gray-900" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder=""
          autoComplete="current-password"
          required
          className="mt-3 block w-full h-12 rounded-lg bg-[#f6f6f6] px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60"
        />
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between gap-4">
        <label className="remember flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <span className="remember-box w-6 h-6 shrink-0 rounded-md bg-[#efefef] shadow-soft grid place-items-center transition-colors peer-checked:bg-blue-600">
            <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10.5l4 4 8-9"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-lg font-semibold text-gray-900">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-lg font-semibold text-[#f87171] hover:text-white hover:bg-red-400 whitespace-nowrap p-2 cursor-pointer rounded-lg active:scale-[0.98] transition"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Actions */}
      <div className="flex gap-6 pt-2">
        <Button
          type="submit"
          className="flex-1"
        >
          Login
        </Button>
        <Button
          type="button"
          onClick={() => router.push("/signup")}
          variant="secondary"
          className="flex-1"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
}
