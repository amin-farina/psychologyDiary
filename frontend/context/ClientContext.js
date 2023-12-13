"use client";

import { getAllAppointment, getAllTurnosDisponibles } from "@/app/api/service";
import { getAllClients, getClientByUsername } from "@/app/api/cliente";
import { decodeJWT } from "@/utils/jwt";
import { createContext, useContext, useEffect, useState } from "react";

const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [todosClientes, setTodosClientes] = useState([]);
  const [newClient, setNewClient] = useState(false);
  const [todosTurnos, setTodosTurnos] = useState([]);
  const [newAppointment, setNewAppointment] = useState(false);
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [nuevoTurnoDisponible, setNuevoTurnoDisponible] = useState(false);
  const [loading, setLoading] = useState(true);

  //Login
  const [userLogged, setUserLogged] = useState();
  const [userLoggedRole, setUserLoggedRole] = useState();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async (role, username) => {
      if (role === "admin") {
        try {
          const allClients = (await getAllClients())?.props.resultsAll;
          setTodosClientes(allClients);
          console.log("Set all clients admin", allClients.resultsId);
        } catch (err) {
          console.error("Error fetching clients for admin:", err);
        } finally {
          setLoading(false);
        }
      } else {
        if (role === "usuario") {
          try {
            const allClients = (await getClientByUsername(username))?.props
              .resultsId;
            setTodosClientes(allClients);
            console.log("Set all clients user", allClients);
          } catch (err) {
            console.log("Error fetching clients for user: ", err);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    fetchData(userLoggedRole, userLogged);
  }, [newClient, loading, userLoggedRole, userLogged]);

  useEffect(() => {
    if (!userLogged) {
      const tokenStorage = localStorage.getItem("token");
      if (
        !tokenStorage ||
        tokenStorage === null ||
        tokenStorage === undefined
      ) {
        setCargando(false);
      } else {
        const decode = decodeJWT(tokenStorage);
        if (decode) {
          setUserLogged(decode.username);
          setUserLoggedRole(decode.role);
        }
        setCargando(false);
      }
    } else {
      setCargando(false);
    }
  }, [cargando]);

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
        userLogged,
        setUserLogged,
        setCargando,
        cargando,
        userLoggedRole,
        setUserLoggedRole,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClientContext() {
  return useContext(ClientContext);
}
