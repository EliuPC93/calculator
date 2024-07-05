import { describe, expect, test } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { SubmissionForm } from './submission'
import { OPERATIONS } from '../utils';

describe("SubmissionForm", () => {
    test("Should ", async () => {
        const content = render(<SubmissionForm operation={OPERATIONS.ADDITION} />)
        
        const numbers = await content.findAllByPlaceholderText("Add a number")
        await fireEvent.change(content.getByTestId("number1").querySelector("input") as HTMLInputElement, {target: {value: "3"}});
        await fireEvent.change(content.getByTestId("number2").querySelector("input") as HTMLInputElement, {target: {value: "3"}});

        expect(numbers.length).toBe(2)
    })
})
