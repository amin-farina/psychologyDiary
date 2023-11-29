"use client"
import { postNewAppointment } from "@/app/api/service";
import { useClientContext } from "@/context/ClientContext";
import { useState } from "react";
import { ObtenerElDia } from "./obtenerElDia";
import { format } from 'date-fns';
import Swal from "sweetalert2";

const obtenerTurnosDisponibles = (fechaSeleccionada, diaSeleccionado, turnosPredefinidos, turnosOcupados) => {
    const turnosParaElDia = turnosPredefinidos
        .filter(turno => turno.dia === diaSeleccionado)
    const horasOcupadas = turnosOcupados
        .filter(turno => turno.fecha === fechaSeleccionada)
        .map(turno => turno.hora);
    const turnosDisponibles = turnosParaElDia.filter(turno => !horasOcupadas.includes(turno.horario));
    return turnosDisponibles;
};

export function FormularioTurno() {
    const [formData, setFormData] = useState({
        fecha: '',
        dia: '',
        ClienteId: '',
        statusTurn: '',
        hora: '',
    });
    const [fechaFormateada, setFechaFormateada] = useState()
    const [turnoDisp, setTurnoDisp] = useState()
    const [agregarOtroHorario, setAgregarOtroHorario] = useState(false);

    const { newAppointment, setNewAppointment, todosClientes, turnosDisponibles, todosTurnos } = useClientContext()
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        if (name === "fecha") {
            const fechaModificada = new Date(`${value}T12:00:00Z`);
            const diaObtenido = ObtenerElDia({ dia: fechaModificada.getDay() })
            const offset = fechaModificada.getTimezoneOffset();
            fechaModificada.setMinutes(fechaModificada.getMinutes() - offset);
            setTurnoDisp(obtenerTurnosDisponibles(value, diaObtenido, (turnosDisponibles?.resultsAll), (todosTurnos?.appointments)));
            setFechaFormateada(format(fechaModificada, "dd-MM-yyyy"))
            setFormData((prevData) => ({ ...prevData, ["dia"]: diaObtenido }));
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "¿Estás seguro que quieres este turno?",
            html: `Datos del turno: <br> El dia <b>${formData.dia}</b> a las <b>${formData.hora}</b>, el dia de la fecha es el <b>${fechaFormateada}</b>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear turno",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const agregarNuevoTurno = (await postNewAppointment(formData)).props;
                    setNewAppointment(!newAppointment)
                    console.log(agregarNuevoTurno)
                    if ('error' in agregarNuevoTurno) {
                        Swal.fire({
                            title: "Error al agregar el nuevo turno",
                            html: `El error es: ${agregarNuevoTurno.error} `,
                            icon: "error",
                        });
                    } else if ('turno' in agregarNuevoTurno) {
                        Swal.fire({
                            title: "Nuevo turno agregado con exito",
                            html: `Dia: <b> ${agregarNuevoTurno.turno.dia}</b> <br> Hora: <b> ${agregarNuevoTurno.turno.hora}</b> <br> Fecha: <b> ${agregarNuevoTurno.turno.fecha}</b> `,
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Respuesta inesperada del servidor:",
                            html: `El error es: ${agregarNuevoTurno} `,
                            icon: "error",
                        });
                    }
                    setFormData({
                        fecha: '',
                        dia: '',
                        ClienteId: '',
                        statusTurn: '',
                        hora: '',
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error al enviar datos:",
                        html: `El error es: ${error} `,
                        icon: "success",
                    });
                }
            }
        });
    };

    return (
        <section className="flex justify-center">
            <form onSubmit={handleSubmit2} className="">
                <div className="my-4 space-y-2 text-center">
                    <h1>Fecha:</h1>
                    <label className="block mb-2">
                        <input type="date" placeholder="dd-mm-yyyy" name="fecha" value={formData.fecha} onChange={handleChange2} className="border border-gray-300 px-2 py-1 text-black" />
                        {formData.dia &&
                            <h1 className="text-white mt-2">
                                {formData.dia}
                                {fechaFormateada && (
                                    <span>
                                        {" " + fechaFormateada}
                                    </span>
                                )
                                }
                            </h1>}
                    </label>
                </div>
                <div className="my-4 space-y-2 text-center">
                    <h1>Hora:</h1>
                    <label className="block mb-2">
                        {agregarOtroHorario ? (
                            <input
                                type="text"
                                name="hora"
                                value={formData.hora}
                                onChange={handleChange2}
                                className="border border-gray-300 px-2 py-1 text-black"
                            />
                        ) : (
                            <select
                                name="hora"
                                value={formData.hora}
                                onChange={handleChange2}
                                className="border border-gray-300 px-2 py-1 text-black"
                            >
                                <option value="" disabled defaultValue>Selecciona una hora</option>
                                {turnoDisp?.length > 0 && (
                                    <>
                                        {turnoDisp.map((hora) => (
                                            <option value={hora.horario} key={hora.id}>{hora.horario}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                        )}
                    </label>
                    <label className="flex space-x-2 text-center justify-center">
                        <input
                            type="checkbox"
                            checked={agregarOtroHorario}
                            onChange={() => setAgregarOtroHorario(!agregarOtroHorario)}
                        />
                        <p>Agregar otro horario</p>
                    </label>
                </div>
                <div className="my-4 space-y-2 text-center">
                    <h1>Cliente:</h1>
                    <label className="block mb-2">
                        <select name="ClienteId" value={formData.ClienteId} onChange={handleChange2} className="border border-gray-300 px-2 py-1 text-black">
                            <option value="" disabled defaultValue>Selecciona un cliente</option>
                            {todosClientes?.resultsAll?.map((cliente) => (
                                <option value={cliente.dni} key={cliente.dni}>{cliente.name} {cliente.lastName}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="my-4 space-y-2 text-center">
                    <h1>Estado:</h1>
                    <label className="block mb-2">
                        <select name="statusTurn" value={formData.statusTurn} onChange={handleChange2} className="border border-gray-300 px-2 py-1 text-black">
                            <option value="" disabled defaultValue>Selecciona un estado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="realizado">Realizado</option>
                        </select>
                    </label>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500   text-white px-4 py-2 rounded">Enviar</button>
                </div>
            </form>
        </section>

    );
};