import { describe, expect, test, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import Operations from './page'

vi.mock("./components/submission-form/page", async (importActual) => {
    const mod = await importActual<any>();
    return {
        ...mod,
        SubmissionForm: () => <div data-testid="submission-form-test" />,
    }; 
});

describe("Operations page", () => {
    test("Form", () => {
        const { getByRole } = render(<Operations />)
        
        const selector = screen.getByRole('combobox', { name: 'Select operation type' })
        expect(selector).toBeDefined()

        fireEvent.mouseDown(getByRole('combobox'))
        const listbox = within(getByRole("listbox"))
        fireEvent.click(listbox.getByText(/Addition/i))
        
        const submissionForm = screen.getByTestId('submission-form-test')
        expect(submissionForm).toBeDefined()
    })
})