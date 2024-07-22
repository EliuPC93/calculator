"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export async function handleSubmit (formData: FormData) {
    
    const username = formData.get('username');
    if (username) {
        cookies().set("username", `${username}`)
    }
    const password = formData.get('password');
    
    const res = await fetch(process.env.API + "/security/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    
    if (res.ok) {
        const response = await res.json()
        cookies().set("token", response.jwt)
        redirect("/records")
    } else {
        const errorBody = await res.json()
        throw Error(errorBody.message)
    }
};