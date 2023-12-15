"use client"

import { useClientContext } from "@/context/ClientContext";
import { EliminarElemento } from "../CRUD/eliminar";
import { format } from 'date-fns';
import { UpdateTurno } from "./updateTurno";

export function ListadoDeTurnos() {
    const { todosTurnos } = useClientContext()

    const formatearFecha = (fecha) => {
        const fechaModificada = new Date(`${fecha}T12:00:00Z`);
        return (
            format(fechaModificada, "dd-MM-yyyy")
        )
    }


    return (
        <section className="w-full justify-center flex">
            <table className="table-style">
                <thead>
                    <tr>
                        <th>Nombre y Apellido</th>
                        <th>Dia</th>
                        <th>Hora</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {todosTurnos?.appointments?.map((turno) => (
                        <tr key={turno.id}>
                            <td>{turno.nombreCliente}</td>
                            <td>{turno.dia}</td>
                            <td>{turno.hora}</td>
                            <td>{formatearFecha(turno.fecha)}</td>
                            <td>{turno.statusTurn}</td>
                            <td>
                                <EliminarElemento id={turno.id} type="appointment" />
                                <UpdateTurno id={turno.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </section>
    )
}