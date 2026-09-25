"use client";

import { signUpAction } from '@/app/actions/auth';

export default function SignUp() {

  return (
    <form className="mt-10 space-y-9" action={signUpAction}>
      {/* Full Name + Username */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
        <div>
          <label htmlFor="fullname" className="block text-lg font-bold text-gray-900">
            Full Name
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            autoComplete="name"
            required
            className="mt-3 block w-full h-12 rounded-lg bg-white px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60"
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-lg font-bold text-gray-900">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="mt-3 block w-full h-12 rounded-lg bg-white px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60"
          />
        </div>
      </div>

      {/* Email Address */}
      <div>
        <label htmlFor="email" className="block text-lg font-bold text-gray-900">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-3 block w-full h-12 rounded-lg bg-white px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-lg font-bold text-gray-900">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className="mt-3 block w-full h-12 rounded-lg bg-white px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60"
        />
      </div>

      {/* Submit */}
      <div className="pt-8">
        <button
          type="submit"
          className="block mx-auto w-full sm:w-[76%] h-13 py-3.5 rounded-lg bg-brand text-white text-lg font-medium shadow-soft hover:bg-[#4a7de0] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Create An Account
        </button>
      </div>
    </form>
  );
}
