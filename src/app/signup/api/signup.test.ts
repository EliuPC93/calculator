import { expect, test, Mock, vi, describe } from 'vitest'
import { handleSubmit } from './signup'
import { redirect } from 'next/navigation';

describe('Login api', () => {
    test('HandleSubmit - success', async () => {
        (global.fetch as Mock).mockResolvedValue({
            status: 200,
            ok: true,
            json: async () => ({ jwt: "123" }),
        });
        const formData = new FormData()
        const username = "pedro"
        const password = "123"
        formData.set("username", username)
        formData.set("password", password)
        
        await handleSubmit(formData);
        
        expect(fetch).toHaveBeenCalledWith(process.env.API + "/v1/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        expect(redirect).toHaveBeenCalledWith("/login")
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

vi.mock("next/navigation", async () => {
    return {
        redirect: vi.fn()
    }
});