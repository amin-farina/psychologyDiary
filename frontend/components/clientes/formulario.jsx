"use client"
import { getClientById, postNewClient, updateClient } from "@/app/api/cliente";
import { getAllUsersUsuarios } from "@/app/api/usuarios";
import { useClientContext } from "@/context/ClientContext";
import { useEffect, useState } from "react";

export function FormularioCliente({ accion, dni, onAccionChange }) {
    const [formData, setFormData] = useState({
        dni: '',
        name: '',
        lastName: '',
        email: '',
        telefono: '',
        username: ''
    });


    const { newClient, setNewClient, userLogged, userLoggedRole } = useClientContext()
    const [profesionales, setProfesionales] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllUsersUsuarios();
                setProfesionales(res.props.results);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };
        const fetchInfo = async () => {

            const res = (await getClientById(dni))?.props.resultsId;
            setFormData({
                dni: res.dni,
                name: res.name,
                lastName: res.lastName,
                email: res.email,
                telefono: res.telefono,
                username: res.username
            })
        }

        if (userLoggedRole === "usuario") {
            setProfesionales([])
            setFormData((prevData) => ({ ...prevData, username: userLogged }))
        } else {
            fetchData();
        }
        if (accion === "editar") {
            console.log("Entre en editar")
            fetchInfo();
        }

    }, [accion, dni, newClient, userLoggedRole]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (accion === "crear") {
            try {
                await postNewClient(formData);
                setNewClient(!newClient)
                setFormData({
                    dni: '',
                    name: '',
                    lastName: '',
                    email: '',
                    telefono: '',
                    username: ''
                });
                onAccionChange("")
            } catch (error) {
                console.error('Error al enviar datos:', error);
            }
        } else {
            if (accion === "editar") {
                try {
                    await updateClient(dni, formData);
                    setFormData({
                        dni: '',
                        name: '',
                        lastName: '',
                        email: '',
                        telefono: '',
                        username: ''
                    });
                    setNewClient(!newClient)
                    onAccionChange("")
                } catch (error) {
                    console.error('Error al enviar datos:', error);
                }
            }
        }

    };

    return (
        <section className="w-full justify-center flex flex-col items-center ">
            <form onSubmit={handleSubmit} className="">
                <div className="my-4 space-y-2 ">
                    <h1>DNI:</h1>
                    <label className="block">
                        <input type="text" name="dni" value={formData.dni} disabled={accion === "editar"} onChange={handleChange} className="border border-gray-300 px-2 py-1 text-black" />
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
                {userLoggedRole === 'admin' && (
                    <div className="my-4 space-y-2">
                        <h1>Profesional</h1>
                        <label className="block">
                            <select name="username" onChange={handleChange} value={formData.username} className="border border-gray-300 px-2 py-1 text-black">
                                <option value="" disabled defaultValue>Seleccionar Profesional</option>
                                {profesionales.length > 0 && (
                                    <>
                                        {profesionales.map((user) => (
                                            <option key={user.username} value={user.username}>{user.name}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </label>
                    </div>
                )}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-5">
                    {accion === "editar" && (<h1>Modificar Cliente</h1>)}
                    {accion === "crear" && (<h1> Crear Cliente</h1>)}
                </button>
            </form>
        </section>
    );
};