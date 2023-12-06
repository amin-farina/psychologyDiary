"use client"

import { postLoginUser } from "@/app/api/service";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useClientContext } from "@/context/ClientContext";


export default function FormLogin() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [token, setToken] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const { setCargando } = useClientContext();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const tokenStorage = localStorage.getItem("token")
        if (tokenStorage) {
            router.push("/")
        }
    }, [])

    useEffect(() => {
        if (token !== undefined) {
            localStorage.setItem("token", token)
            setLoading(false)
            setCargando(true)
            router.push("/")
        }
    }, [token, loading])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = (await postLoginUser(formData))?.results
            if (response.token) {
                setToken(response.token)
            }
            if (response.message) {
                setError(response.message)
            }
        } catch (err) {
            console.log(err)
        }
        setFormData({
            username: '',
            password: ''
        });
    };
    return (
        <>
            {loading ? (
                <h1>cargando</h1>
            ) : (
                <section className="flex justify-center w-screen items-center min-h-[80vh]">
                    <div className="w-1/3 border px-8 py-5">
                        <div className="w-full text-center">
                            <h2>Login</h2>
                        </div>
                        <div className="w-full my-2">
                            <form onSubmit={handleSubmit} className="grid grid-1 justify-center">
                                <div className="my-2 space-y-2 mx-2 text-center">
                                    Usuario:
                                    <label className="block">
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="border border-gray-300 px-2 py-1 text-black"
                                        />
                                    </label>
                                </div>
                                <div className="my-2 space-y-2 mx-2 text-center">
                                    Contraseña:
                                    <label className="block">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="border border-gray-300 px-2 py-1 text-black"
                                        />
                                    </label>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    {error && <p className="text-red-700">{error}</p>}
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <button type="submit" className="hover:bg-white text-white bg-purple-800 hover:text-black px-4 py-2 rounded">
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            )}
        </>
    );

}