"use client"

import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { deleteRecords, fetchOperations } from './api/records';
import { DataGrid, GridAddIcon, GridColDef, GridDeleteIcon, GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RecordsResponse } from '../../utils';
import { Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client"

export default function Records() {
  const [rows, setRows] = useState<RecordsResponse[]>([])
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const cols: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    {
      field: 'amount',
      headerName: 'Cost',
      width: 70,
      editable: true,
    },
    {
      field: 'operationType',
      headerName: 'Operation Type',
      width: 200,
      editable: true,
    },
    {
      field: 'operationResponse',
      headerName: 'Operation Result',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
    },
  ]
  
  useEffect(() => {
      const stompClient = Stomp.over(new SockJS("http://127.0.0.1:8080/v1/calculator-websocket"))
      stompClient.activate();
      stompClient.onConnect = function () {
          stompClient.subscribe("/user/balance", function(res) {console.log(res.body)})
          stompClient.send("/app/balance", {}, "jesus@mail.com")
      };
  }, []);

  useEffect(()=> {
    setIsLoading(true)
    requestRecords(paginationModel.page)
  }, [paginationModel])

  function deleteSelectedRows() {
    selectedRows.forEach(async (id: GridRowId) => {
      try {
        await deleteRecords(id)
      } catch (error) {
        alert("Failed deleting row " + id)
      }
    })
    setSelectedRows([])
    requestRecords(0)
  }
  
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
        sx={{marginBottom: 5}}
        rows={rows}
        columns={cols}
        rowCount={-1}
        pageSizeOptions={[5]}
        checkboxSelection
        paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowSelectionModel={selectedRows}
        keepNonExistentRowsSelected
        onRowSelectionModelChange={setSelectedRows}
      />

    <Link href={"/operations"}>
      <Button
        variant="contained"
        startIcon={<GridAddIcon />}>
          Add new operation
      </Button>
    </Link>
      <Button
        sx={{marginLeft: 10}}
        disabled={!selectedRows.length}
        variant="outlined"
        onClick={deleteSelectedRows}
        startIcon={<GridDeleteIcon />}>
          Delete selected rows
      </Button>
    </Container>
  )
}
