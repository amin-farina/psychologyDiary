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



export async function postNewTurnoDisponible(data) {
    const res = await fetch("http://localhost:3001/api/turnoDisponible/create", {
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

export async function getTurnoDisponibleByUsername(username) {
    const res = await fetch(`http://localhost:3001/api/turnoDisponible/getusername/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const resultsId = (await res.json())
    return {
        props: { resultsId },
    }
}