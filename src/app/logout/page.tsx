import { Button } from '@mui/material';
import * as React from 'react';
import { performLogout } from './api/logout';

export default function Logout() {
    function handleLogout() {
        performLogout()
    }

    return <Button  color="inherit" onClick={handleLogout}>Logout</Button>
}