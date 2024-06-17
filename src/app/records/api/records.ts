import { cookies } from "next/headers";
const API = "http://127.0.0.1:8080"

export async function fetchOperations (page: number) {
    const jwt = cookies().get("token")?.value

    const res = await fetch(API + "/operations?page=" + page, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + jwt
        },
    })
    if (res.ok) {
        return res.json();
    } else {
        throw Error("Failed with status: " + res.status)
    }
    
};