"use client"

import { useClientContext } from "@/context/ClientContext"
import { EliminarElemento } from "../CRUD/eliminar"

export function MostrarCliente() {
    const { todosClientes } = useClientContext()

    return (
        <>
            {todosClientes?.resultsAll?.map((cliente) => (
                <div className="flex space-x-3" key={cliente.id}>
                    <h2 >
                        {cliente.id} {cliente.name} {cliente.lastName}
                    </h2>
                    <EliminarElemento id={cliente.id} type="client" />
                </div>
            ))}
        </>
    )
}