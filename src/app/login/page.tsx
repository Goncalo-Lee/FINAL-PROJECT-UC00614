import Image from "next/image";
import Link from "next/link";
import Login from "@/components/auth/Login";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 xl:w-2/5 p-8 flex flex-col">
        {/* Header */}
        <header className="flex items-center min-h-24 gap-8">
          <div className="relative w-12 h-12 shrink-0">
            <div className="absolute top-0 left-0 w-10 h-10 rounded-lg bg-brand"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-md bg-white shadow-soft"></div>
          </div>
          <h1 className="font-serif italic text-4xl font-bold">
            Fortis <span className="text-blue-500">Libertas</span>
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center">
          <div className="flex flex-row">
            <div className="hidden md:block w-3 p-1 rounded-full bg-blue-500 me-10"></div>
            <section className="w-full">
              <h2 className="italic text-4xl font-bold">WELCOME BACK</h2>
              <p className="text-gray-600 mt-2">
                Please Log in to your account
              </p>

              {/* Form Component */}
              <Login />

              {/* Login with Google */}
              {/* Divider */}
              <div className="flex items-center gap-5 pt-2">
                <span className="flex-1 h-0.75 rounded-full bg-black"></span>
                <span className="text-lg font-medium text-gray-800">or</span>
                <span className="flex-1 h-0.75 rounded-full bg-black"></span>
              </div>
              {/* Google */}
              <button
                type="button"
                className="flex w-full h-14 items-center justify-center gap-4 rounded-lg bg-white shadow-soft hover:bg-gray-50 active:scale-[0.99] transition"
              >
                <svg
                  className="w-6 h-6 shrink-0"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                <span className="text-lg font-semibold text-gray-900">
                  Login with Google
                </span>
              </button>

              {/* Terms Text */}
              <p className="text-sm text-gray-500 mt-4">
                By signing up you agree to our{" "}
                <Link href="/terms" className="text-brand hover:underline">
                  Terms of Service
                </Link>{" "}
                and that you have read our{" "}
                <Link href="/privacy" className="text-brand hover:underline">
                  Data Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </main>
      </div>

      {/* Right Section - Background Image */}
      <div className="hidden md:block md:w-1/2 xl:w-3/5 bg-blue-600 rounded-l-[32px] relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=80"
          alt="City skyline at night"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
