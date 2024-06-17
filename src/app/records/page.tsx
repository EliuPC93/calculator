import { Container, Typography, Select, FormControl, InputLabel, MenuItem, Table } from '@mui/material';
import { fetchOperations } from './api/records';

export default async function Records() {
    const records = await fetchOperations(0)
    console.log(records)

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Records
            </Typography>
            {records.length > 0 && <Table>here goes the records</Table>}
        </Container>
    )
}
