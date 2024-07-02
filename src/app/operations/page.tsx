"use client"

import { Container, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import { SubmissionForm } from '../components/submission';
import { OPERATIONS } from './../../utils';

export default function Operations() {
    const [selectedOperation, setSelectedOperation] = useState<OPERATIONS | undefined>()

    return (
        <Container component="main" maxWidth="xs">
            <FormControl fullWidth>
                <InputLabel id="operation-type-label">Select operation type</InputLabel>
                <Select
                    labelId="operation-type-label"
                    id="operationType"
                    name='operationType'
                    label="Operation Type"
                    onChange={(event)=> setSelectedOperation(event.target.value as OPERATIONS)}
                >
                    <MenuItem value={OPERATIONS.ADDITION}>Addition</MenuItem>
                    <MenuItem value={OPERATIONS.SUBTRACTION}>Subtraction</MenuItem>
                    <MenuItem value={OPERATIONS.MULTIPLICATION}>Multiplication</MenuItem>
                    <MenuItem value={OPERATIONS.DIVISION}>Division</MenuItem>
                    <MenuItem value={OPERATIONS.SQUAREROOT}>Square Root</MenuItem>
                    <MenuItem value={OPERATIONS.RANDOMSTRING}>Random String</MenuItem>
                </Select>
            </FormControl>
            {selectedOperation && <SubmissionForm operation={selectedOperation}></SubmissionForm>}
        </Container>
    )
}
