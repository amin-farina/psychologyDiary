"use client"

import { useClientContext } from "@/context/ClientContext"
import { EliminarElemento } from "../CRUD/eliminar"
import { useEffect, useState } from "react"
import { th, tr } from "date-fns/locale"
import { FormularioCliente } from "./formulario"

export function MostrarCliente({ role }) {
    const { todosClientes } = useClientContext()
    const apiWhatsapp = "https://api.whatsapp.com/send?phone="
    const tableAdmin = ["DNI", "Nombre y Apellido", "Email", "Telefono", "Username", "Opciones"]
    const tableUsuario = ["DNI", "Nombre y Apellido", "Email", "Telefono", "Editar"]
    const [cabecera, setCabecera] = useState(tableUsuario)
    const [accion, setAccion] = useState()
    const [dni, setDni] = useState()
    useEffect(() => {
        if (role === "admin") {
            setCabecera(tableAdmin)
        } else {
            if (role === "usuario") {
                setCabecera(tableUsuario)
            }
        }
    }, [])


    const handleCreate = () => {
        setAccion("crear")
    }

    const handleModify = (dni) => {
        setAccion("editar")
        setDni(dni)
    }

    const handleAccionChange = (nuevaAccion) => {
        setAccion(nuevaAccion);
    };
    return (
        <section className="w-full justify-center flex flex-wrap items-center my-10">
            <div className="block w-full justify-center text-center mb-3">
                <h1 className="text-3xl font-bold">Tabla Clientes</h1>
                <button onClick={handleCreate}>Crear cliente</button>
            </div>
            <table className="table-style">
                <thead>
                    <tr>
                        {cabecera.map((option, index) => (
                            <th key={index}>{option}</th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {todosClientes?.resultsAll?.map((cliente) => (
                        <tr key={cliente.dni} className="text-center">
                            {role === "admin" ? (
                                <>
                                    <td>{cliente.dni}</td>
                                    <td>{cliente.name}  {cliente.lastName}</td>
                                    <td><a href={`mailto:${cliente.email}`} target="_blank">{cliente.email}</a></td>
                                    <td><a href={`${apiWhatsapp}${cliente.telefono}`} target="_blank">{cliente.telefono}</a> </td>
                                    <td>{cliente.username}</td>
                                    <td><button onClick={() => handleModify(cliente.dni)}>Modificar</button> <EliminarElemento id={cliente.dni} type="client" /> </td>
                                </>
                            ) : (
                                <>
                                    <td>{cliente.dni}</td>
                                    <td>{cliente.name}  {cliente.lastName}</td>
                                    <td><a href={`mailto:${cliente.email}`} target="_blank">{cliente.email}</a></td>
                                    <td><a href={`${apiWhatsapp}${cliente.telefono}`} target="_blank">{cliente.telefono}</a> </td>
                                    <td><button onClick={() => handleModify(cliente.dni)}>Modificar</button></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full">
                {(accion === 'editar') && (
                    <FormularioCliente role="admin" accion={accion} dni={dni} onAccionChange={handleAccionChange} />
                )}
                {(accion === 'crear') && (
                    <FormularioCliente role="admin" accion={accion} onAccionChange={handleAccionChange} />
                )}
            </div>
        </section>
    )
}