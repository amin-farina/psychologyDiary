"use client"

import { useClientContext } from "@/context/ClientContext"
import { EliminarElemento } from "../CRUD/eliminar"

export function MostrarCliente() {
    const { todosClientes } = useClientContext()
    const apiWhatsapp = "https://api.whatsapp.com/send?phone="

    return (
        <section className="w-full justify-center flex items-center my-10">
            <table className="table-style">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {todosClientes?.resultsAll?.map((cliente) => (
                        <tr key={cliente.dni} className="text-center">
                            <td>{cliente.dni}</td>
                            <td>{cliente.name}</td>
                            <td><a href={`mailto:${cliente.email}`} target="_blank">{cliente.email}</a></td>
                            <td><a href={`${apiWhatsapp}${cliente.telefono}`} target="_blank">{cliente.telefono}</a> </td>
                            <td><EliminarElemento id={cliente.id} type="client" /></td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </section>
    )
}