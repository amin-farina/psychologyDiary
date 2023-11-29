"use client"
import { useClientContext } from "@/context/ClientContext";

export function TurnosDisponibles() {
    const { turnosDisponibles } = useClientContext();

    if (!turnosDisponibles) {
        return <p>No hay turnos disponibles.</p>;
    }

    const turnosOrganizados = turnosDisponibles?.resultsAll?.reduce((result, turno) => {
        const dia = turno.dia;
        if (!result[dia]) {
            result[dia] = [];
        }
        result[dia].push(turno);
        return result;
    }, {});

    const ordenDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    return (
        <div className="w-full justify-center flex flex-wrap">
            <h1 className="w-full text-center mb-2">Turnos disponibles</h1>
            {ordenDias.map((dia) => (
                turnosOrganizados?.[dia] && (
                    <div key={dia} className="m-2 flex">
                        <h2 className="mr-2">{dia}</h2>
                        {turnosOrganizados[dia].map((turno) => (
                            <p key={turno.id} className="pe-2">
                                {turno.horario}
                            </p>
                        ))}
                    </div>
                )
            ))}
        </div>
    );
}