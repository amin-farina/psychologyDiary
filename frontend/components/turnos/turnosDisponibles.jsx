"use client"
import { useClientContext } from "@/context/ClientContext";
import { useState } from "react";
import { FormularioAgregarTurnoDisponible } from "./agregarTurnoDisponible";

export function TurnosDisponibles() {
    const { turnosDisponibles } = useClientContext();
    const [agregarTurno, setAgregarTurno] = useState(false)
    const ordenDias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];


    if (!turnosDisponibles) {
        return <p>No hay turnos disponibles.</p>;
    }


    const turnosOrganizados = turnosDisponibles?.resultsId?.turnos.reduce((result, turno) => {
        const dia = turno.dia;
        if (!result[dia]) {
            result[dia] = [];
        }
        result[dia].push(turno);
        return result;
    }, {});

    const handleAgregarTurno = () => {
        setAgregarTurno(!agregarTurno)
    }



    return (
        <>
            <div className="w-full justify-center flex flex-wrap">
                <div className="flex justify-start w-2/3 mb-2 ">
                    <h1 className="font-bold px-4 items-center justify-start flex">Turnos disponibles</h1>
                    {ordenDias.map((dia) => (
                        turnosOrganizados?.[dia] && (
                            <div key={dia} className="my-2 flex">
                                <h2 className="mr-2 font-bold">{dia}</h2>
                                {turnosOrganizados[dia].map((turno) => (
                                    <p key={turno.id} className="pe-2">
                                        {turno.horario}
                                    </p>
                                ))}
                            </div>
                        )
                    ))}


                </div>
                <div className=" flex justify-end mb-2 w-1/3">
                    {agregarTurno ? (
                        <button onClick={handleAgregarTurno} className="bg-red-700 rounded hover:bg-white hover:text-black px-2 py-1">Cerrar</button>
                    ) : (
                        <button onClick={handleAgregarTurno} className="bg-purple-700 rounded hover:bg-white hover:text-black px-2 py-1">Agregar horario</button>

                    )}
                </div>
                <div className="flex justify-start w-full">
                    {agregarTurno && (
                        <FormularioAgregarTurnoDisponible />
                    )}
                </div>
            </div>

        </>
    );
}