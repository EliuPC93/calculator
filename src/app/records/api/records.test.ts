import { expect, test, Mock, vi, describe } from 'vitest'
import { deleteRecords, fetchOperations } from './records'

describe('Records api', () => {
    describe('fetchOperations', () => {
        test('success', async () => {
            (global.fetch as Mock).mockResolvedValue({
                status: 200,
                ok: true,
                json: async () => ({ records: ["123"] }),
            });
            const expectedParam = 0;
            await fetchOperations(expectedParam);
            
            expect(fetch).toHaveBeenCalledWith(process.env.API + "/v1/records?page=" + expectedParam, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer fakeToken'
                },
            });
        })
        
        test('error', async () => {
            (global.fetch as Mock).mockRejectedValueOnce(new Error("something happened"));
            
            await expect(fetchOperations(0)).rejects.toThrowError()
        })
    })

    describe('deleteRecords', () => {
        test('success', async () => {
            (global.fetch as Mock).mockResolvedValue({
                status: 200,
                ok: true,
            });
            const expectedParam = "asd";
            
            await deleteRecords(expectedParam);
            
            expect(fetch).toHaveBeenCalledWith(process.env.API + "/v1/records/" + expectedParam, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer fakeToken'
                },
            });
        })
        
        test('error', async () => {
            (global.fetch as Mock).mockRejectedValueOnce(new Error("something happened"));
            
            await expect(deleteRecords("123")).rejects.toThrowError()
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
