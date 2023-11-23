import { FormularioCliente } from "@/components/clientes/formulario";
import { MostrarCliente } from "@/components/clientes/mostrarClientes";
import { FormularioTurno } from "@/components/turnos/agregarTurno";
import { ListadoDeTurnos } from "@/components/turnos/listadoDeTurnos";



export default async function ObtenerTurno() {

    return (
        <>
            <MostrarCliente />
            <FormularioCliente />
            <ListadoDeTurnos />
            <FormularioTurno />
        </>
    );

}
