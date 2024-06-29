import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Logout from './page'
import * as logoutApi from './api/logout';

vi.mock("./api/logout", async () => {
    return {
        performLogout: vi.fn()
    }
});

describe("Logout page", () => {
    test('Validate Logout button', () => {
        const logoutSpy = vi.spyOn(logoutApi, "performLogout")
        render(<Logout />)

        const btn = screen.getByRole('button', { name: 'Logout' })

        expect(btn).toBeDefined()
        btn.click()        
        expect(logoutSpy).toHaveBeenCalled()
    })
})