"use client"

export function ModeToggle() {
    const toggle = () => document.documentElement.classList.toggle("dark")

    return (
        <button onClick={toggle} className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <span className="dark:hidden">🌙</span>
            <span className="hidden dark:inline">☀️</span>
        </button>
    )
}