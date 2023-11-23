"use client"
import { postNewAppointment } from "@/app/api/service";
import { useClientContext } from "@/context/ClientContext";
import { useState } from "react";

export function FormularioTurno() {
    const [formData, setFormData] = useState({
        fecha: '',
        ClienteId: '',
        statusTurn: '',
        hora: '',
    });

    const { newAppointment, setNewAppointment, todosClientes } = useClientContext()
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            await postNewAppointment(formData);
            setNewAppointment(!newAppointment)
            setFormData({
                fecha: '',
                ClienteId: '',
                statusTurn: '',
                hora: '',
            });
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit2} className="">
            <label className="block mb-2">
                Fecha:
                <input type="date" name="fecha" value={formData.fecha} onChange={handleChange2} className="border border-gray-300 px-2 py-1 text-black" />
            </label>
            <label className="block mb-2">
                Hora:
                <input type="text" name="hora" value={formData.hora} onChange={handleChange2} className="border border-gray-300 px-2 py-1 text-black" />
            </label>
            <br />
            <label className="block mb-2">
                Cliente:
                <select name="ClienteId" value={formData.ClienteId} onChange={handleChange2} className="border border-gray-300 px-2 py-1 text-black">
                    <option value="" disabled selected>Selecciona un cliente</option>
                    {todosClientes?.resultsAll?.map((cliente) => (
                        <option value={cliente.id}>{cliente.name} {cliente.lastName}</option>
                    ))}
                </select>

            </label>
            <br />
            <label className="block mb-2">
                Estado:
                <select name="statusTurn" value={formData.statusTurn} onChange={handleChange2} className="border border-gray-300 px-2 py-1 text-black">
                    <option value="" disabled selected>Selecciona un estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="realizado">Realizado</option>
                </select>
            </label>
            <br />

            <br />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
        </form>
    );
};