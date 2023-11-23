"use client"

import { useClientContext } from "@/context/ClientContext";
import { EliminarElemento } from "../CRUD/eliminar";

export function ListadoDeTurnos() {
    const { todosTurnos, loading, setLoading } = useClientContext()
    const hundleButton = () => {
        setLoading(!loading)
    }
    return (
        <>
            Listado Turnos
            {todosTurnos?.appointments?.map((turno) => (
                <div className="flex space-x-3" key={turno.id}>
                    <h2>
                        {turno.id} || {turno.nombreCliente} || {turno.fecha} || {turno.hora} || {turno.statusTurn}
                    </h2>
                    <EliminarElemento id={turno.id} type="appointment" />
                </div>
            ))}
            <button onClick={hundleButton}>Recargar</button>
        </>
    )
}