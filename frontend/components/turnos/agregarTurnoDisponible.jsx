"use client"

import { postNewTurnoDisponible } from "@/app/api/turnosDisponibles";
import { getAllUsersUsuarios } from "@/app/api/usuarios";
import { useClientContext } from "@/context/ClientContext";
import { useEffect, useState } from "react";

export function FormularioAgregarTurnoDisponible() {
    const { userLogged, userLoggedRole, loading, setLoading } = useClientContext()
    const [formData, setFormData] = useState({
        dia: '',
        horario: '',
        username: ''
    })
    const [profesionales, setProfesionales] = useState([])

    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postNewTurnoDisponible(formData);
            setFormData({
                dia: '',
                horario: '',
                username: ''
            })
            setLoading(!loading)
        } catch (err) {
            console.log("Error: ", err)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllUsersUsuarios();
                setProfesionales(res.props.results);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };
        if (userLoggedRole === "admin") {
            fetchData()
        } else {
            if (userLoggedRole === "usuario") {
                setFormData({
                    username: userLogged
                })
            }
        }
    }, [loading])


    return (
        <div className="flex justify-center w-full">
            <form onSubmit={handleSubmit}>
                <div className="my-4 space-y-2 text-center ">
                    <h1>Dia</h1>
                    <select name="dia" id="dia" value={formData.dia} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black">
                        <option value="" defaultValue>Seleccionar Día</option>
                        {dias.map((dia) => (
                            <option value={dia}>{dia}</option>
                        ))}
                    </select>
                </div>
                <div className="my-4 space-y-2 text-center ">
                    <h1>Horario</h1>
                    <input type="time"
                        id="time"
                        placeholder="Time"
                        name="horario"
                        step="3000"
                        value={formData.horario}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-2 py-1 text-black" />
                </div>
                {(userLoggedRole === "admin") && (
                    <div className="my-4 space-y-2 ">
                        <h1>Profesional</h1>
                        <select name="username" id="username" value={formData.username} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" >
                            <option value="" defaultValue>Seleccionar Profesional</option>
                            {profesionales.length > 0 && (
                                <>
                                    {profesionales.map((user) => (
                                        <option key={user.username} value={user.username}>{user.name}</option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>
                )}
                <button type="submit" className="bg-purple-700 px-3 rounded py-1 w-full">Agregar Horiario</button>
            </form>
        </div>
    )
}