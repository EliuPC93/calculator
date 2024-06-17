'use client'
import { Button } from "@mui/base";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

export enum OPERATIONS {
    ADDITION = "addition",
    MULTIPLICATION = "multiplication", 
    SQUAREROOT = "square_root",
    RANDOMSTRING = "random_string"
}

interface OperationsProps {
    notifyOperation: (operation: OPERATIONS) => void
}

export default function Selector({notifyOperation}: OperationsProps) {
    const [operation, setOperation] = useState<OPERATIONS>()


    function isSelected(element: OPERATIONS): boolean | undefined {
        if (!operation) {
            return false;
        }

        return operation != element;
    }

    function handleSelection(operation: OPERATIONS) {
        setOperation(operation)
        notifyOperation(operation)
    }


    return (
        <Box>
            <Typography component="h2">Operation type</Typography>
            <Button onClick={() => handleSelection(OPERATIONS.ADDITION)} disabled={isSelected(OPERATIONS.ADDITION)}>Addition</Button>
            <Button onClick={() => handleSelection(OPERATIONS.MULTIPLICATION)} disabled={isSelected(OPERATIONS.MULTIPLICATION)}>Multiplication</Button>
            <Button onClick={() => handleSelection(OPERATIONS.SQUAREROOT)} disabled={isSelected(OPERATIONS.SQUAREROOT)}>Square Root</Button>
            <Button onClick={() => handleSelection(OPERATIONS.RANDOMSTRING)} disabled={isSelected(OPERATIONS.RANDOMSTRING)}>Random String</Button>
        </Box>
    )
}