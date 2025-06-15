import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Avatar, Box, Button, Stack, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Order = () => {
    document.title = 'Dashboard Order'

    const theme = useTheme();
    const [order, setOrder] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/invoice/index`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            console.log(response.data.invoice)
            setOrder(response.data.invoice)
        }).catch((error) => {
            console.error(error)
        })

    }, [count])

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
        {
            field: "actions", headerName: "Actions",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <>
                        <Link to={`/dashboard/execute/${id}`}>
                            <Button
                                sx={{
                                    "background": theme.palette.info.dark,
                                    "color": "#fff",
                                    "margin": "2px"
                                }}
                                startIcon={<CheckCircleIcon />}
                                variant="contained"
                            // color={}
                            >
                                Execute
                            </Button>
                        </Link>
                    </>
                );
            }
        },
    ];

    return (
        <Box>
            <Stack direction={"row"}>
                <Header
                    title="Order"
                    subTitle="Here are all the orders in the store"
                />
                <Box flexGrow={1} />
                {/* <Link to={`/dashboard/createTax`}><Button
                    sx={{
                        "background": theme.palette.primary.main,
                        "color": "#fff",
                        "margin": "2px",
                        "width": "120px",
                        "height": "50px"
                    }}
                    startIcon={<AddIcon />}
                    variant="contained"
                // color={}
                >Add</Button></Link> */}
            </Stack>
            <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
                <DataGrid
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    rows={order}
                    // @ts-ignore
                    columns={columns}

                />
            </Box>
        </Box>
    )
}

export default Order