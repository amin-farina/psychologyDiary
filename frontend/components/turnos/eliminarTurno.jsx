import { deleteAppointment } from "@/app/api/service"
import { useClientContext } from "@/context/ClientContext";
import Swal from 'sweetalert2'


export function EliminarTurno(id) {
    const { newAppointment, setNewAppointment } = useClientContext()
    const handleDelete = async () => {
        Swal.fire({
            title: "¿Estás seguro que quieres eliminar este usuario?",
            text: "Esta acción no se puede revertir.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const turnoEliminado = await deleteAppointment(id.id);
                    setNewAppointment(!newAppointment);
                    Swal.fire({
                        title: "Eliminado con éxito",
                        html: `El turno fue eliminado con exito `,
                        icon: "success",
                    });
                } catch (error) {
                    console.error("Error al eliminar el turno:", error);
                    Swal.fire({
                        title: "Error al eliminar",
                        text:
                            "Hubo un problema al eliminar el turno. Por favor, inténtalo de nuevo.",
                        icon: "error",
                    });
                }
            }
        });
    };


    return (
        <>
            <button className="text-bold text-red-700" onClick={handleDelete}>X</button>
        </>
    )
}