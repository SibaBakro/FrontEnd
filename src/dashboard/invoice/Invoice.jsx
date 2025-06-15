import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Avatar, Box, Button, Stack, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Invoice = () => {
  document.title = 'Dashboard Invoice'

  const theme = useTheme();
  const [invoice, setInvoice] = useState([])

  useEffect(() => {
    // @ts-ignore
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/invoice/getInvoice`, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
      },
    }).then((response) => {
      console.log(response.data.invoice)
      setInvoice(response.data.invoice)
    }).catch((error) => {
      console.error(error)
    })


  }, [])

  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 80 },
    {
      field: "invoice_total_price",
      headerName: "Total Price",
      cellClassName: "name-column--cell",
      // flex: 1,
    },
    {
      field: "invoice_address",
      headerName: "Invoice Address",
      flex: 1,
    },
    {
      field: "invoice_shipping",
      headerName: "Invoice Shipping",
      // flex: 1,
    },
    {
      field: "invoice_delivery",
      headerName: "Invoice Delivery",
      // flex: 1,
    },
    {
      field: "name",
      headerName: "Client Name",
      // flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Client Email",
      flex: 1,
    },

  ];

  return (
    <Box>
      <Stack direction={"row"}>
        <Header
          title="Invoices"
          subTitle="Here are all the invoices in the store"
        />
        {/* <Box flexGrow={1} /> */}
      </Stack>
      <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={invoice}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default Invoice