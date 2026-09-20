import Image from "next/image";
import SignUp from "@/components/auth/SignUp";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen w-full">
      {/* Left Section - Background Image */}
      <aside className="relative hidden lg:block w-1/2">
        <Image
          src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=80"
          alt="City skyline at night"
          fill
          className="object-cover rounded-r-[2.5rem]"
          priority
        />

        {/* Logo Overlay */}
        <div className="absolute top-10 left-12 flex items-center gap-4 select-none">
          <div className="relative w-12 h-12 shrink-0">
            <div className="absolute top-0 left-0 w-10 h-10 rounded-lg bg-brand"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-md bg-white shadow-soft"></div>
          </div>
          <p className="italic font-serif text-3xl xl:text-4xl leading-none">
            <span className="font-semibold text-white">Fortis</span>{" "}
            <span className="font-semibold text-brand">Libertas</span>
          </p>
        </div>
      </aside>

      {/* Right Section - Content */}
      <section className="w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-14 py-12">
        <div className="w-full max-w-147.5">
          {/* Logo (Mobile) */}
          <div className="lg:hidden flex items-center gap-4 mb-12 select-none">
            <div className="relative w-12 h-12 shrink-0">
              <div className="absolute top-0 left-0 w-10 h-10 rounded-lg bg-brand"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-md bg-white shadow-soft"></div>
            </div>
            <p className="font-serif text-3xl leading-none">
              <span className="font-semibold text-gray-900">Fortis</span>{" "}
              <span className="font-semibold text-brand">Libertas</span>
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-center text-3xl lg:text-[2.1rem] font-extrabold italic tracking-tight text-gray-900">
            Signup with this services
          </h1>

          {/* Google Signup Button */}
          <div className="mt-9 flex justify-center">
            <button
              type="button"
              aria-label="Sign up with Google"
              className="w-14 h-14 rounded-xl bg-white shadow-soft grid place-items-center hover:bg-gray-50 active:scale-95 transition"
            >
              <svg
                className="w-7 h-7"
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
            </button>
          </div>

          {/* Divider */}
          <div className="mt-10 flex items-center gap-6">
            <span className="flex-1 h-0.75 rounded-full bg-black"></span>
            <span className="text-lg font-medium text-gray-800">or</span>
            <span className="flex-1 h-0.75 rounded-full bg-black"></span>
          </div>

          {/* Form Component */}
          <SignUp />
        </div>
      </section>
    </main>
  );
}
