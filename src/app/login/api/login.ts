"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
const API = "http://127.0.0.1:8080"

export async function handleSubmit (formData: FormData) {

    const username = formData.get('username');
    const password = formData.get('password');

    const res = await fetch(API + "/security/login", {
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
      console.log("login error")
    }
  };