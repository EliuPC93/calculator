import { expect, test, Mock, vi, describe } from 'vitest'
import { API, handleSubmit } from './operations'

describe('Operations api', () => {
    describe('HandleSubmit', () => {
        test('addition', async () => {
            (global.fetch as Mock).mockResolvedValue({
                status: 200,
                ok: true,
                json: async () => ({ response: "123" }),
            });
            
            const formData = new FormData()
            const operationType = "addition"
            formData.set("operationType", operationType)
            formData.set("number1", "12")
            formData.set("number2", "34")
            
            const expectedRequestBody = { type: operationType, number1: 12, number2: 34 }
            
            await handleSubmit(formData);
            
            expect(fetch).toHaveBeenCalledWith(API, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer fakeToken'
                },
                body: JSON.stringify(expectedRequestBody) 
            });
        })
        
        test('square_root', async () => {
            (global.fetch as Mock).mockResolvedValue({
                status: 200,
                ok: true,
                json: async () => ({ response: "123" }),
            });
            
            const formData = new FormData()
            const operationType = "square_root"
            formData.set("operationType", operationType)
            formData.set("number1", "12")
            
            const expectedRequestBody = { type: operationType, number1: 12 }
            
            await handleSubmit(formData);
            
            expect(fetch).toHaveBeenCalledWith(API, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer fakeToken'
                },
                body: JSON.stringify(expectedRequestBody) 
            });
        })
        
        test('random_string', async () => {
            (global.fetch as Mock).mockResolvedValue({
                status: 200,
                ok: true,
                json: async () => ({ response: "123" }),
            });
            
            const formData = new FormData()
            const operationType = "random_string"
            formData.set("operationType", operationType)
            
            const expectedRequestBody = { type: operationType }
            
            await handleSubmit(formData);
            
            expect(fetch).toHaveBeenCalledWith(API, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer fakeToken'
                },
                body: JSON.stringify(expectedRequestBody) 
            });
        })
        
        test('error', async () => {
            (global.fetch as Mock).mockRejectedValueOnce(new Error("something happened"));
            const formData = new FormData()
            const operationType = "random_string"
            formData.set("operationType", operationType)
            
            await expect(handleSubmit(formData)).rejects.toThrowError()
        })
    })
})

global.fetch = vi.fn();
vi.mock("next/headers", async () => {
    return {
        cookies: vi.fn().mockReturnValue({
            get: vi.fn().mockReturnValue({value: "fakeToken"}),
        }),
    };
});
