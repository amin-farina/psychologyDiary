"use client"

import { useClientContext } from "@/context/ClientContext"
import { EliminarElemento } from "../CRUD/eliminar"
import { useEffect, useState } from "react"
import { th, tr } from "date-fns/locale"
import { FormularioCliente } from "./formulario"
import { getClientById } from "@/app/api/cliente"

export function MostrarCliente() {
    const { todosClientes, userLoggedRole } = useClientContext()
    const apiWhatsapp = "https://api.whatsapp.com/send?phone="
    const tableAdmin = ["DNI", "Nombre y Apellido", "Email", "Telefono", "Profesional", "Opciones"]
    const tableUsuario = ["DNI", "Nombre y Apellido", "Email", "Telefono", "Editar"]
    const [cabecera, setCabecera] = useState(tableUsuario)
    const [accion, setAccion] = useState()
    const [search, setSearch] = useState(false)
    const [valueSearch, setValueSearch] = useState({
        valor: ''
    })
    const [resultSearch, setResultSearch] = useState()
    const [dni, setDni] = useState()

    useEffect(() => {
        if (userLoggedRole === "admin") {
            setCabecera(tableAdmin)
        } else {
            if (userLoggedRole === "usuario") {
                setCabecera(tableUsuario)
            }
        }
    }, [userLoggedRole])



    const handleCreate = () => {
        setAccion("crear")
    }

    const handleModify = (dni) => {
        setAccion("editar")
        setDni(dni)
    }

    const handleSearch = () => {
        setSearch(!search)
    }

    const handleAccionChange = (nuevaAccion) => {
        setAccion(nuevaAccion);
    };

    const handleChangeSearch = (e) => {
        const { name, value } = e.target;
        setValueSearch((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        try {
            const response = (await getClientById(valueSearch.valor))?.props.resultsId
            setResultSearch(response);
            setValueSearch({ valor: '' })
        } catch (err) {
            console.log("Error: ", err)
        }
    }
    return (
        <section className="w-full justify-center flex flex-wrap  my-10">
            <div className="flex w-full justify-center text-center mb-3">
                <div className="w-2/3 flex justify-center">
                    <h1 className="text-3xl font-bold">Tabla Clientes</h1>
                </div>
                <div className="w-1/3 flex justify-center">
                    <button onClick={handleSearch} className="hover:bg-white text-white bg-cyan-800 hover:text-black px-4 py-2 rounded" >Buscar cliente</button>
                    <button onClick={handleCreate} className="hover:bg-white text-white bg-purple-800 hover:text-black px-4 py-2 mx-2 rounded" >Crear cliente</button>

                </div>
            </div>
            {search && (
                <div className="flex w-full justify-center mb-3">
                    <form onSubmit={handleSubmitSearch} className="space-x-3">
                        <input type="text" placeholder="Buscar por DNI" name="valor" value={valueSearch.valor} onChange={handleChangeSearch} className="border border-gray-300 px-2 py-1 text-black" />
                        <button type="submit" className="px-3 py-1 bg-purple-700 rounded hover:bg-purple-300 hover:text-black">Buscar</button>
                    </form>
                </div>
            )}
            <div className="w-screen flex justify-center ">
                <table className="table-style">
                    <thead>
                        <tr>
                            {cabecera.map((option, index) => (
                                <th key={index}>{option}</th>
                            ))}

                        </tr>
                    </thead>
                    <tbody>
                        {search ? (
                            userLoggedRole === "admin" ? (
                                <>
                                    <td>{resultSearch?.dni}</td>
                                    <td>{resultSearch?.name} {resultSearch?.lastName}</td>
                                    <td><a href={`mailto:${resultSearch?.email}`} target="_blank">{resultSearch?.email}</a></td>
                                    <td><a href={`${apiWhatsapp}${resultSearch?.telefono}`} target="_blank">{resultSearch?.telefono}</a> </td>
                                    <td>{resultSearch?.nombreProfesional}</td>
                                    {resultSearch &&
                                        <td className="space-x-3"> <button onClick={() => handleModify(resultSearch?.dni)}>Modificar</button> <EliminarElemento id={resultSearch?.dni} type="client" /> </td>
                                    }
                                </>
                            ) : (
                                <>
                                    <td>{resultSearch?.dni}</td>
                                    <td>{resultSearch?.name} {resultSearch?.lastName}</td>
                                    <td><a href={`mailto:${resultSearch?.email}`} target="_blank">{resultSearch?.email}</a></td>
                                    <td><a href={`${apiWhatsapp}${resultSearch?.telefono}`} target="_blank">{resultSearch?.telefono}</a> </td>
                                    <td><button onClick={() => handleModify(resultSearch?.dni)}>Modificar</button></td>
                                </>
                            )
                        ) : (
                            todosClientes?.map((cliente) => (
                                <tr key={cliente.dni} className="text-center">
                                    {userLoggedRole === "admin" ? (
                                        <>
                                            <td>{cliente.dni}</td>
                                            <td>{cliente.name} {cliente.lastName}</td>
                                            <td><a href={`mailto:${cliente.email}`} target="_blank">{cliente.email}</a></td>
                                            <td><a href={`${apiWhatsapp}${cliente.telefono}`} target="_blank">{cliente.telefono}</a> </td>
                                            <td>{cliente.nombreProfesional}</td>
                                            <td className="space-x-3"> <button onClick={() => handleModify(cliente.dni)}>Modificar</button> <EliminarElemento id={cliente.dni} type="client" /> </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{cliente.dni}</td>
                                            <td>{cliente.name} {cliente.lastName}</td>
                                            <td><a href={`mailto:${cliente.email}`} target="_blank">{cliente.email}</a></td>
                                            <td><a href={`${apiWhatsapp}${cliente.telefono}`} target="_blank">{cliente.telefono}</a> </td>
                                            <td><button onClick={() => handleModify(cliente.dni)}>Modificar</button></td>
                                        </>
                                    )}
                                </tr>
                            ))
                        )}


                    </tbody>
                </table>
            </div>

            <div className="w-full">
                {(accion === 'editar') && (
                    <FormularioCliente accion={accion} dni={dni} onAccionChange={handleAccionChange} />
                )}
                {(accion === 'crear') && (
                    <FormularioCliente accion={accion} onAccionChange={handleAccionChange} />
                )}
            </div>
        </section>
    )
}