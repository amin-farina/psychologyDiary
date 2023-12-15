export async function getAllUsersUsuarios() {
    const res = await fetch("http://localhost:3001/api/user/getusuarios", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const results = (await res.json())?.users
    return {
        props: { results }
    }
}



export async function getUserByUsername(username) {
    const res = await fetch(`http://localhost:3001/api/user/byusername/${username}`, {
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
