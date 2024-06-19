"use client"

import { Container, Typography, Select, FormControl, InputLabel, MenuItem, Box, Link, Button } from '@mui/material';
import { useState } from 'react';
import { SubmissionForm } from './components/submission-form/page';
import { GridColumnIcon } from '@mui/x-data-grid';

export enum OPERATIONS {
    ADDITION = "addition",
    SUBTRACTION = "subtraction",
    DIVISION = "division",
    MULTIPLICATION = "multiplication", 
    SQUAREROOT = "square_root",
    RANDOMSTRING = "random_string"
}

export default function Operations() {
    const [selectedOperation, setSelectedOperation] = useState<OPERATIONS | undefined>()

    return (
        <Container component="main" maxWidth="xs">
            <Box>
            <Link href={"/records"}>
                <Button
                    variant="contained">
                        <GridColumnIcon />
                    Go to records table
                </Button>
            </Link>
            </Box>
            <Typography component="h1" variant="h5">
                Welcome to the operations page
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="operation-type-label">Operation</InputLabel>
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
