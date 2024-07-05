import { describe, expect, test, vi, Mock } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import Records from './page'
import { deleteRecords, fetchOperations } from './api/records';

vi.mock("./api/records", async () => {
    return {
        fetchOperations: vi.fn().mockResolvedValue([{
            id: "123",
            amount: "20",
            operationType: "addition",
            operationResponse: "10",
            date: "2024-08-08"
        }]),
        deleteRecords: vi.fn()
    }; 
});

describe("Records page", () => {
    test("Should display fetched records", async () => {
        const content = render(<Records />)
        
        const title = await content.findByText(/Records/i)
        
        expect(fetchOperations).toBeCalledWith(0)
        expect(title).toBeDefined()
    })
    
    test("Should call deleteRecords", async () => {
        const content = render(<Records />)
        
        const checkbox = await content.findAllByRole("checkbox")
        checkbox[0].click()

        const submitBtn = await content.findAllByText(/Delete selected rows/i)
        submitBtn[0].click()
        
        expect(deleteRecords).toBeCalledWith("123")
    })
    
    test("Should call alert if deleteRecords fails", async () => {
        (deleteRecords as Mock).mockRejectedValue(new Error("something failed"));
        const alertSpy = vi.spyOn(global, "alert")        
        const content = render(<Records />)
        const checkbox = await content.findAllByRole("checkbox")
        checkbox[0].click()

        const submitBtn = await content.findAllByText(/Delete selected rows/i)
        submitBtn[0].click()
        
        expect(deleteRecords).toBeCalledWith("123")
        waitFor(() => expect(alertSpy).toBeCalledWith("Failed deleting row 123"))
    })
})
