const obtenerTurnosDisponibles = (fechaSeleccionada, turnosPredefinidos, turnosOcupados) => {
 

  const turnosParaElDia = turnosPredefinidos.filter(turno => turno.dia === fechaSeleccionada);
  const horasOcupadas = turnosOcupados.map(turno => turno.hora);
  const turnosDisponibles = turnosParaElDia.filter(turno => !horasOcupadas.includes(turno.horario));

  return turnosDisponibles;
};