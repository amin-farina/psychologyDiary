"use client"
import { postNewClient } from "@/app/api/service";
import { useClientContext } from "@/context/ClientContext";
import { useState } from "react";

export function FormularioCliente() {
    const [formData, setFormData] = useState({
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
        <form onSubmit={handleSubmit} className="">
            <label className="block mb-2">
                Nombre:
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
            </label>
            <br />
            <label className="block mb-2">
                Apellido:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
            </label>
            <br />
            <label className="block mb-2">
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
            </label>
            <br />
            <label className="block mb-2">
                Teléfono:
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
            </label>
            <br />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
        </form>
    );
};