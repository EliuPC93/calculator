"use client"

import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { fetchOperations } from './api/records';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

export interface RecordsResponse {
  id: string,
  amount: string,
  operationType: string,
  operationResponse: string,
  date: string
}

export default function Records() {
  const [rows, setRows] = useState<RecordsResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const cols: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      editable: true,
    },
    {
      field: 'operationType',
      headerName: 'Operation Type',
      width: 150,
      editable: true,
    },
    {
      field: 'operationResponse',
      headerName: 'Operation Result',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 160,
    },
  ]

  useEffect(()=> {
    setIsLoading(true)
    requestRecords(paginationModel.page)
  }, [paginationModel])
  
  function requestRecords(page: number) {
    fetchOperations(page)
    .then((response: RecordsResponse[]) => {
      setRows(response)
      setIsLoading(false)
    });
  }

  if (isLoading) return <Container component="main"><Box marginTop={"20%"} sx={{ display: 'flex' }} justifyContent={"center"} alignItems={"center"}><CircularProgress /></Box></Container>

  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        Records
      </Typography>
      <DataGrid
        rows={rows}
        columns={cols}
        rowCount={-1}
        pageSizeOptions={[5]}
        checkboxSelection
        paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Container>
  )
}
