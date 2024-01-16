"use client"

import { useClientContext } from "@/context/ClientContext";
import { EliminarElemento } from "../CRUD/eliminar";
import { format } from 'date-fns';
import { UpdateTurno } from "./updateTurno";
import { useEffect, useState } from "react";

export function ListadoDeTurnos({ fecha }) {
    const { todosTurnos } = useClientContext()
    const [turnosDelDia, setTurnosDelDia] = useState(false)
    const [currentDay, setCurrentDay] = useState()

    const formatearFecha = (currentDate) => {
        const fechaModificada = new Date(`${currentDate}T12:00:00Z`);
        return (
            format(fechaModificada, "dd-MM-yyyy")
        )
    }

    const fechaPasada = (currentDate, turno) => {
        const fechaActual = new Date(currentDate);
        const fechaTurno = new Date(turno);
        console.log(fechaActual, fechaTurno, turno)
        if (fechaActual < fechaTurno) {
            return (true)
        } else {
            return (false)
        }
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
                        <tr key={turno.id} className={`bg-green-700 m-0  ${fechaPasada(new Date(), turno.fecha) ? (turno.statusTurn === "confirmado" ? "bg-green-600" : "bg-yellow-600") : "bg-black"}`}>
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