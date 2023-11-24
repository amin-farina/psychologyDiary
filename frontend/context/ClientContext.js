"use client";

import {
  getAllAppointment,
  getAllClients,
  getAllTurnosDisponibles,
} from "@/app/api/service";
import { createContext, useContext, useEffect, useState } from "react";

const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [todosClientes, setTodosClientes] = useState([]);
  const [newClient, setNewClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [todosTurnos, setTodosTurnos] = useState([]);
  const [newAppointment, setNewAppointment] = useState(false);
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [nuevoTurnoDisponible, setNuevoTurnoDisponible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allClients = (await getAllClients()).props;
        setTodosClientes(allClients);
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [newClient, loading]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const allAppointments = (await getAllAppointment()).props;
        setTodosTurnos(allAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [newAppointment, loading]);

  useEffect(() => {
    const fetchTurnosDisponibles = async () => {
      try {
        const todosTurnosDisponibles = (await getAllTurnosDisponibles()).props;
        setTurnosDisponibles(todosTurnosDisponibles);
      } catch (err) {
        console.error("Erorr get TURNOS DISPONIBLES: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTurnosDisponibles();
  }, [nuevoTurnoDisponible, loading]);

  return (
    <ClientContext.Provider
      value={{
        todosClientes,
        setTodosClientes,
        setNewClient,
        newClient,
        todosTurnos,
        setNewAppointment,
        newAppointment,
        setLoading,
        loading,
        turnosDisponibles,
        nuevoTurnoDisponible,
        setNuevoTurnoDisponible,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClientContext() {
  return useContext(ClientContext);
}
