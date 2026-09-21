"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Box} from "lucide-react";
import Navbar from "@/app/navbar";

export default function Header() {
    const pathname = usePathname();
    return (
        <>
            <header className="w-full px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                        <Box className="w-5 h-5" />
                    </div>
                </div>
                <Navbar />

            </header>
        </>

    )

}
