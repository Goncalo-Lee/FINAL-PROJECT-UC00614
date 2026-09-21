"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        fullname: formData.get("fullname"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      // TODO: Add your signup API call here
      // const response = await fetch("/api/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      console.log(data);

      // Example: redirect on success
      // if (response.ok) {
      //   router.push("/login");
      // }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-10 space-y-9" onSubmit={handleSubmit}>
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

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
      )}

      {/* Submit */}
      <div className="pt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="block mx-auto w-full sm:w-[76%] h-13 py-3.5 rounded-lg bg-brand text-white text-lg font-medium shadow-soft hover:bg-[#4a7de0] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "Creating Account..." : "Create An Account"}
        </button>
      </div>
    </form>
  );
}
