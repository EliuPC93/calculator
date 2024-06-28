import { Input, Button, Box, FormControl } from '@mui/material';
import { handleSubmit } from '../../api/operations';
import { OPERATIONS } from '../../page';
import { useState } from 'react';

export function SubmissionForm({operation}: {operation: OPERATIONS}) {
    const [response, setResponse] = useState()

    async function submitForm(formData: FormData) {
        try {            
            const response = await handleSubmit(formData)
            setResponse(response.result)
        } catch (error) {
            alert("there was an error during the operation")
        }
    }

    return (
            <Box component="form" action={submitForm}  noValidate sx={{ mt: 1 }}>
                <FormControl fullWidth>
                    <Input type='hidden' id='operationType' name='operationType' value={operation}></Input>
                </FormControl>
                {operation != OPERATIONS.RANDOMSTRING && 
                    <Box>
                        <FormControl fullWidth>
                            <Input type='number' placeholder='Add a number' id='number1' name='number1'></Input>
                        </FormControl>

                        
                    {operation != OPERATIONS.SQUAREROOT && 
                        <FormControl fullWidth>
                            <Input type='number' placeholder='Add a number' id='number2' name='number2'></Input>
                        </FormControl>
                    }
                    </Box>
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Calculate
                </Button>

                {response && <Box>The response is {response}</Box>}
            </Box>
    )
}