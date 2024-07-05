import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import RootLayout from './layout'

vi.mock("next/font/google", async () => {
    return {
        Inter: vi.fn().mockReturnValue({className: "fake"})
    }; 
});

describe("RootLayout", () => {
    test("Should render root layout with children", async () => {
        const content = render(<RootLayout children={<div data-testid="myChild"></div>} />)
        
        expect(content.getByTestId("myChild")).toBeDefined()
    })
})
