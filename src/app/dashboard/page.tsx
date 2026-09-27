import { Logout } from "@/components/logout";
import Enable2FA from "@/app/dashboard/Enable2FA";;
import {auth} from "@/lib/auth";
import { headers } from "next/headers";


export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        return <p>Not logged in</p>;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
                <Logout/>
            </div>
            <p className="text-center">
                Two-Factor Authentication Status:{" "}
                <span className="font-bold">
                    {session.user.twoFactorEnabled ? "Enabled" : "Disabled"}
                </span>
            </p>

            <p className="text-center">
                Username:{" "}

                <span className="font-bold">{session.user.name}</span>
            </p>
            <p className="text-center">
                Email:{" "}

                <span className="font-bold">{session.user.email}</span>
            </p>

            <div className="flex flex-col items-center justify-center h-screen">
                <Enable2FA session={session}/>
            </div>
        </>
    );
}