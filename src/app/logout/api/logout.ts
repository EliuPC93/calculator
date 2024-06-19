"use server"
import { redirect } from 'next/navigation';

import { cookies } from 'next/headers';

export async function performLogout() {
    cookies().delete("token")
    redirect("/login")
}
