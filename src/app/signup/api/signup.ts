"use server"

import { redirect } from 'next/navigation';

export async function handleSubmit (formData: FormData) {
    
    const username = formData.get('username');
    const password = formData.get('password');
    
    const res = await fetch(process.env.API + "/v1/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    
    if (res.ok) {
        redirect("/login")
    } else {
        const errorBody = await res.json()
        throw Error(errorBody.message)
    }
};