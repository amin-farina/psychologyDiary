export async function getAllAppointment() {
    const res = await fetch("http://localhost:3001/api/turnos/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
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

