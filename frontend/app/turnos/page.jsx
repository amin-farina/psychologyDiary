import { FormularioTurno } from "@/components/turnos/agregarTurno";
import { ListadoDeTurnos } from "@/components/turnos/listadoDeTurnos";
import { TurnosDisponibles } from "@/components/turnos/turnosDisponibles";



export default async function ObtenerTurno() {

    return (
        <>
            <ListadoDeTurnos />
            <TurnosDisponibles />
            <FormularioTurno />
        </>
    );

}


