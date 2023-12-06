"use client"

import { useClientContext } from "@/context/ClientContext"
import { EliminarElemento } from "../CRUD/eliminar"
import { useEffect, useState } from "react"
import { th, tr } from "date-fns/locale"

export function MostrarCliente({ role }) {
    const { todosClientes } = useClientContext()
    const apiWhatsapp = "https://api.whatsapp.com/send?phone="
    const tableAdmin = ["DNI", "Nombre y Apellido", "Email", "Telefono", "Username", "Opciones"]
    const tableUsuario = ["DNI", "Nombre y Apellido", "Email", "Telefono", "Editar"]
    const [cabecera, setCabecera] = useState(tableUsuario)
    useEffect(() => {
        if (role === "admin") {
            setCabecera(tableAdmin)
        } else {
            if (role === "usuario") {
                setCabecera(tableUsuario)
            }
        }
    }, [])

    return (
        <section className="w-full justify-center flex flex-wrap items-center my-10">
            <div className="block w-full justify-center text-center mb-3">
                <h1 className="text-3xl font-bold">Tabla Clientes</h1>

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
                                    <td>{cliente.name}</td>
                                    <td><a href={`mailto:${cliente.email}`} target="_blank">{cliente.email}</a></td>
                                    <td><a href={`${apiWhatsapp}${cliente.telefono}`} target="_blank">{cliente.telefono}</a> </td>
                                    <td>{cliente.username}</td>
                                    <td><EliminarElemento id={cliente.id} type="client" /></td>
                                </>
                            ) : (
                                <>
                                    <td>{cliente.dni}</td>
                                    <td>{cliente.name}</td>
                                    <td><a href={`mailto:${cliente.email}`} target="_blank">{cliente.email}</a></td>
                                    <td><a href={`${apiWhatsapp}${cliente.telefono}`} target="_blank">{cliente.telefono}</a> </td>
                                    <td>Modificar Cliente</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}