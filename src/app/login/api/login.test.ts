import { expect, test, Mock, vi, describe } from 'vitest'
import { handleSubmit } from './login'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

describe('Login api', () => {
    test('HandleSubmit - success', async () => {
        (global.fetch as Mock).mockResolvedValue({
            status: 200,
            ok: true,
            json: async () => ({ jwt: "123" }),
        });
        const cookieSpy = vi.spyOn(cookies(), "set")
        const formData = new FormData()
        const username = "pedro"
        const password = "123"
        formData.set("username", username)
        formData.set("password", password)
        
        await handleSubmit(formData);
        
        expect(fetch).toHaveBeenCalledWith(process.env.API + "/security/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        expect(cookieSpy).toHaveBeenCalledWith("token", "123")
        expect(redirect).toHaveBeenCalledWith("/records")
    })
    
    test('HandleSubmit - error', async () => {
        (global.fetch as Mock).mockResolvedValue({
            status: 500,
            ok: false,
            json: async () => ({ message: "fatal error" }),
        });
        const formData = new FormData()
        const username = "pedro"
        const password = "123"
        formData.set("username", username)
        formData.set("password", password)
        
        await expect(handleSubmit(formData)).rejects.toThrowError()
    })
    
})

global.fetch = vi.fn();
vi.mock("next/headers", async () => {
    return {
        cookies: vi.fn().mockReturnValue({
            set: vi.fn(),
        }),
    };
});

vi.mock("next/navigation", async () => {
    return {
        redirect: vi.fn()
    }
});