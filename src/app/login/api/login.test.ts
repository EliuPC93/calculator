import { expect, test, Mock, vi, describe } from 'vitest'
import { API, handleSubmit } from './login'

global.fetch = vi.fn();

describe('Login api', () => {
    test('HandleSubmit - success', async () => {
        (global.fetch as Mock).mockResolvedValue({
            status: 200,
            json: async () => ({ jwt: "123" }),
        });
        const formData = new FormData()
        const username = "pedro"
        const password = "123"
        formData.set("username", username)
        formData.set("password", password)
        
        await handleSubmit(formData);
        
        expect(fetch).toHaveBeenCalledWith(API + "/security/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
    })

    test('HandleSubmit - error', async () => {
        (global.fetch as Mock).mockRejectedValueOnce(new Error("something happened"));
        const formData = new FormData()
        const username = "pedro"
        const password = "123"
        formData.set("username", username)
        formData.set("password", password)
        
        await expect(handleSubmit(formData)).rejects.toThrowError()
    })
})
