'use client';

import { useTheme } from 'next-themes';

export function ModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const toggle = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggle}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle theme"
        >
            <span className="dark:hidden">🌙</span>
            <span className="hidden dark:inline">☀️</span>
        </button>
    );
}