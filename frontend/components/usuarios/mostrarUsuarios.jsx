"use client"

import { useClientContext } from "@/context/ClientContext"
import { useRouter } from 'next/navigation'
import { useEffect } from "react";


export function MostrarUsuarios() {
    const { userLoggedRole } = useClientContext()
    const router = useRouter();

    useEffect(() => {
        if (userLoggedRole !== "admin") {
            router.push('');
        }
    }, [userLoggedRole, router]);
    return (
        (userLoggedRole === "admin") ? (
            <h1>Admin</h1>
        ) : (
            <h1>Usuario</h1>
        )
    )
}