import { FormularioCliente } from "@/components/clientes/formulario";
import { MostrarCliente } from "@/components/clientes/mostrarClientes";

export default function Clientes() {
    return (
        <section className="flex flex-wrap justify-center  items-center">
            <MostrarCliente />
        </section>
    )
}