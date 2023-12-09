import { useClientContext } from "@/context/ClientContext"

export async function getAllClients() {
    const res = await fetch("http://localhost:3001/api/clientes/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache"
    })
    const resultsAll = (await res.json())?.clientes
    return {
        props: { resultsAll }
    }
}

export async function getClientById(id) {
    const res = await fetch(`http://localhost:3001/api/clientes/getclienteid/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const resultsId = (await res.json())?.cliente
    return {
        props: { resultsId },
    }
}

export async function getClientByUsername(username) {
    const res = await fetch(`http://localhost:3001/api/clientes/getUsuarios/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const resultsId = (await res.json())?.cliente
    return {
        props: { resultsId },
    }
}

export async function postNewClient(data) {
    const res = await fetch(`http://localhost:3001/api/clientes/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

}

export async function updateClient(id, data) {
    const res = await fetch(`http://localhost:3001/api/clientes/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const respuesta = await res.json()
    return {
        props: respuesta
    }
}


export async function deleteClient(dni) {
    const res = await fetch(`http://localhost:3001/api/clientes/${dni}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })

    const deleteClient = (await res.json())?.cliente
    return { props: deleteClient }

}



export async function getAllAppointment() {
    const res = await fetch("http://localhost:3001/api/turnos/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache"
    })
    const appointments = (await res.json()).turno

    return {
        props: { appointments }
    }
}

export async function deleteAppointment(id) {
    const res = await fetch(`http://localhost:3001/api/turnos/${id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
    const deleteAppointment = (await res.json())?.turno
    return {
        props: { deleteAppointment }
    }
}

export async function postNewAppointment(data) {
    const res = await fetch("http://localhost:3001/api/turnos/create", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    const respuesta = await res.json()
    return {
        props: respuesta
    }
}

export async function updateAppointment(id, data) {
    const res = await fetch(`http://localhost:3001/api/turnos/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const respuesta = await res.json()
    return {
        props: respuesta
    }
}




export async function getAllTurnosDisponibles() {
    const res = await fetch("http://localhost:3001/api/turnoDisponible", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const resultsAll = (await res.json())?.turnosDisponibles
    return {
        props: { resultsAll }
    }
}



export async function postLoginUser(data) {
    const res = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const results = await res.json()
    return {
        results
    }
}

