"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function WelcomeHero() {
    const router = useRouter();

    return (
        <main className="relative flex min-h-[calc(100vh-100px)] w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-8">
            {/* Background glow effects to match the navbar */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-300/40 blur-3xl sm:w-[600px] sm:h-[600px]" />

            <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-100/60 px-4 py-1.5 text-sm font-medium text-blue-800 backdrop-blur-sm shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    Welcome to the platform
                </div>

                {/* Title */}
                <h1 className="font-serif text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                    Empower Your Journey with{" "}
                    <span className="italic block mt-1">
            Fortis <span className="text-blue-600">Libertas</span>
          </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                    Strength through liberty. Manage your workflows, explore powerful insights,
                    and take full control of your digital space from a single, intuitive interface.
                </p>

                {/* Actions */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={() => router.push("/signup")}
                        className="rounded-full px-8 py-3 text-base shadow-lg shadow-blue-500/25 transition-transform hover:-translate-y-0.5"
                    >
                        Get Started Free
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.push("/login")}
                        className="rounded-full border border-gray-200 bg-white/80 px-8 py-3 text-base text-gray-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-gray-100"
                    >
                        Go to Login Page
                    </Button>
                </div>

                {/* Quick feature overview pills */}
                <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 w-full max-w-3xl">
                    <div className="rounded-2xl border border-white/60 bg-white/50 p-5 shadow-sm backdrop-blur-sm text-left">
                        <h3 className="font-semibold text-gray-900">Secure by Default</h3>
                        <p className="mt-1 text-sm text-gray-600">Enterprise-grade protection designed to keep your workspace safe.</p>
                    </div>
                    <div className="rounded-2xl border border-white/60 bg-white/50 p-5 shadow-sm backdrop-blur-sm text-left">
                        <h3 className="font-semibold text-gray-900">Seamless Control</h3>
                        <p className="mt-1 text-sm text-gray-600">Instant access to unified analytics and dashboard tools.</p>
                    </div>
                    <div className="rounded-2xl border border-white/60 bg-white/50 p-5 shadow-sm backdrop-blur-sm text-left">
                        <h3 className="font-semibold text-gray-900">Built for Speed</h3>
                        <p className="mt-1 text-sm text-gray-600">Optimized client workflows with zero unnecessary friction.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}