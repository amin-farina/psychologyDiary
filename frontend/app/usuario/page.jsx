"use client"
import { FormularioTurno } from "@/components/turnos/agregarTurno"
import { ListadoDeTurnos } from "@/components/turnos/listadoDeTurnos"
import { TurnosDisponibles } from "@/components/turnos/turnosDisponibles"
import { useClientContext } from "@/context/ClientContext"

export default function UsuarioPage() {
    const { dataUserLogged } = useClientContext()

    return (
        <section className="w-screem flex flex-wrap justify-center">
            <div className="mx-auto container mb-5">
                <h1 className="text-2xl font-bold">Dashboard {dataUserLogged?.name}</h1>
                <div className="border w-full"></div>
            </div>
            <div className="mx-auto container mb-5">
                <TurnosDisponibles />
                <div className="border w-full my-5"></div>
                <div className="w-full flex">
                    <div className="w-1/2">
                        <ListadoDeTurnos />
                    </div>
                    <div className="w-1/2">
                        <FormularioTurno />
                    </div>
                </div>
            </div>
        </section>
    )
}