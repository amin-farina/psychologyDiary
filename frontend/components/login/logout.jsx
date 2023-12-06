"use client"

import { useClientContext } from "@/context/ClientContext"

export default function Logout() {
    const { setUserLogged } = useClientContext()
    sessionStorage.removeItem("token")
    setUserLogged("")
}