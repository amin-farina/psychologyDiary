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