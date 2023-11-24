"use client"

import { useClientContext } from "@/context/ClientContext";
import { EliminarElemento } from "../CRUD/eliminar";

export function ListadoDeTurnos() {
    const { todosTurnos, loading, setLoading, turnosDisponibles } = useClientContext()
    const hundleButton = () => {
        setLoading(!loading)
        console.log(turnosDisponibles.resultsAll)
    }
    return (
        <>
            Listado Turnos
            {todosTurnos?.appointments?.map((turno) => (
                <div className="flex space-x-3" key={turno.id}>
                    <h2>
                        {turno.id} || {turno.nombreCliente} || {turno.dia} - {turno.fecha} || {turno.hora} || {turno.statusTurn}
                    </h2>
                    <EliminarElemento id={turno.id} type="appointment" />
                </div>
            ))}
            <button onClick={hundleButton}>Recargar</button>
            {turnosDisponibles?.resultsAll?.map((disponible) => (
                <h2 key={disponible.id}>{disponible.id} || {disponible.dia} || {disponible.horario}</h2>
            ))}
        </>
    )
}