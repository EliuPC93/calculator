"use server"

import { cookies } from "next/headers";
import { RecordsResponse } from "../page";
import { GridRowId } from "@mui/x-data-grid";

export async function fetchOperations (page: number): Promise<RecordsResponse[]> {
    const jwt = cookies().get("token")?.value
    
    const res = await fetch(`${process.env.API}/v1/records?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + jwt
        },
    })
    if (res.ok) {
        const data = await res.json()
        return data.records;
    } else {
        throw Error("Fetching: Failed with status: " + res.status)
    }
    
};

export async function deleteRecords(id: GridRowId) {
    const jwt = cookies().get("token")?.value
    
    const res = await fetch(`${process.env.API}/v1/records/${id}`, {
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