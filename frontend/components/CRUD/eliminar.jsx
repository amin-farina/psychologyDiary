import { deleteClient, deleteAppointment } from "@/app/api/service";
import { useClientContext } from "@/context/ClientContext";
import Swal from 'sweetalert2';

export function EliminarElemento({ id, type }) {
  const { newClient, setNewClient, newAppointment, setNewAppointment } = useClientContext();
  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar este elemento?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (type === 'client') {
            const usuarioEliminado = await deleteClient(id);
            setNewClient(!newClient);
            Swal.fire({
              title: "Eliminado con éxito",
              html: `El usuario <b>${usuarioEliminado.props.name} ${usuarioEliminado.props.lastName}</b> fue eliminado con éxito`,
              icon: "success",
            });
          } else if (type === 'appointment') {
            const turnoEliminado = await deleteAppointment(id);
            setNewAppointment(!newAppointment);
            Swal.fire({
              title: "Eliminado con éxito",
              html: `El turno fue eliminado con éxito`,
              icon: "success",
            });
          }
        } catch (error) {
          console.error(`Error al eliminar el ${type}:`, error);
          Swal.fire({
            title: "Error al eliminar",
            text: `Hubo un problema al eliminar el ${type}. Por favor, inténtalo de nuevo.`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <button className="text-bold text-red-700" onClick={handleDelete}>Eliminar</button>
    </>
  );
}