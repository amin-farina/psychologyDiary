import { FormularioCliente } from "@/components/clientes/formulario";
import { MostrarCliente } from "@/components/clientes/mostrarClientes";

export default function ClientesAdminPage() {
    return (
        <section className="flex justify-center items-center flex-wrap w-screen min-h-[80vh]">
            <MostrarCliente role="admin" />
        </section>
    )
}