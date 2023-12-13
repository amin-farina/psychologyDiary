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
    const res = await fetch(`http://localhost:3001/api/clientes/getusername/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const resultsId = (await res.json())?.clientes
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