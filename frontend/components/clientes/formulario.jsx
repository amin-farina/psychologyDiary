"use client"
import { postNewClient } from "@/app/api/service";
import { useClientContext } from "@/context/ClientContext";
import { useState } from "react";

export function FormularioCliente() {
    const [formData, setFormData] = useState({
        dni: '',
        name: '',
        lastName: '',
        email: '',
        telefono: '',
    });

    const { newClient, setNewClient } = useClientContext()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await postNewClient(formData);
            setNewClient(!newClient)
            setFormData({
                dni: '',
                name: '',
                lastName: '',
                email: '',
                telefono: '',
            });
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    };

    return (
        <section className="w-full justify-center flex flex-col items-center ">
            <form onSubmit={handleSubmit} className="">
                <div className="my-4 space-y-2 ">
                    <h1>DNI:</h1>
                    <label className="block">
                        <input type="text" name="dni" value={formData.dni} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
                    </label>
                </div>
                <div className="my-4 space-y-2">
                    <h1>Nombre:</h1>
                    <label className="block">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
                    </label>
                </div>
                <div className="my-4 space-y-2">
                    <h1>Apellido:</h1>
                    <label className="block">
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
                    </label>
                </div>
                <div className="my-4 space-y-2">
                    <h1>Email:</h1>
                    <label className="block">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
                    </label>
                </div>
                <div className="my-4 space-y-2">
                    <h1>Teléfono:</h1>
                    <label className="block">
                        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
                    </label>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-5">Enviar</button>
            </form>
        </section>
    );
};