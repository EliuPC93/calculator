"use server"

import { cookies } from "next/headers";
import { OPERATIONS } from "../page";
const API = "http://127.0.0.1:8080"

interface RequestBody {
    type: string;
    number1?: number;
    number2?: number;
}

export async function handleSubmit (formData: FormData) {
    const jwt = cookies().get("token")?.value
    const type = formData.get("operationType") as string;
    const requestBody: RequestBody = { type }

    if (requestBody.type !== OPERATIONS.RANDOMSTRING) {
        const number1 = formData.get("number1")
        if (number1) {
            requestBody.number1 = parseFloat(number1.toString())
        }
    }

    if (requestBody.type !== OPERATIONS.SQUAREROOT) {
        const number2 = formData.get("number2")
        if (number2) {
            requestBody.number2 = parseFloat(number2.toString())
        }
    }

    const res = await fetch(API + "/operations", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + jwt
        },
        body: JSON.stringify(requestBody),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw Error("Failed with status: " + res.status)
    }
    
};