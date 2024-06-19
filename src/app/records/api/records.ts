"use server"

import { cookies } from "next/headers";
import { RecordsResponse } from "../page";
import { GridRowId } from "@mui/x-data-grid";
const API = "http://127.0.0.1:8080/operations"

export async function fetchOperations (page: number): Promise<RecordsResponse[]> {
    const jwt = cookies().get("token")?.value
    
    const res = await fetch(`${API}?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + jwt
        },
    })
    if (res.ok) {
        return res.json();
    } else {
        throw Error("Fetching: Failed with status: " + res.status)
    }
    
};

export async function deleteRecords(id: GridRowId) {
    console.log("deleting " + id)
    const jwt = cookies().get("token")?.value
    
    const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + jwt
        },
    })
    if (res.ok) {
        return;
    } else {
        throw Error("Deletion: Failed with status: " + res.status)
    }
    
}