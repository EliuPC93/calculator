import { expect, test, Mock, vi, describe } from 'vitest'
import { performLogout } from './logout';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation"

vi.mock("next/headers", async () => {
    return {
        cookies: vi.fn().mockReturnValue({
            get: vi.fn(),
            delete: vi.fn(),
        }),
    };
});

vi.mock("next/navigation", async () => {
    return {
        redirect: vi.fn()
    }
});

describe('Logout api', () => {
    test('performLogout', async () => {

        const getSpy = vi.spyOn(cookies(), "delete")
        await performLogout()

        expect(getSpy).toHaveBeenCalledWith("token")
        expect(redirect).toHaveBeenCalledWith("/login")
    })
})