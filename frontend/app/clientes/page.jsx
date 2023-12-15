import { FormularioCliente } from "@/components/clientes/formulario";
import { MostrarCliente } from "@/components/clientes/mostrarClientes";

export default function Clientes() {
    return (
        <section className="flex justify-center flex-wrap w-screen ">
            <MostrarCliente />
        </section>
    )
}