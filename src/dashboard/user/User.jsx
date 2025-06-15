import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Avatar, Box, Button, Stack, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { Link } from 'react-router-dom';
const User = () => {
    document.title = 'Dashboard User'

    const theme = useTheme();
    const [user, setUser] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/user/index`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            console.log(response.data.user)
            setUser(response.data.user)
        }).catch((error) => {
            console.error(error)
        })

    }, [count])

    const handleDeleteRow = (id) => {
        if (window.confirm("Are you sure you want to delete it ?")) {
            // @ts-ignore
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/user/destroy/${id}`, {
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
                },
            })
            setCount(x => x + 1)
        }

    }
    const columns = [
        { field: "id", headerName: "ID", type: "number", width: 80 },
        {
            field: "name",
            headerName: "Name",
            cellClassName: "name-column--cell",
            // flex: 1,

        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone",
            // flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            // flex: 1,
        },
        // {
        //     field: "user_region",
        //     headerName: "User Region",
        //     // flex: 1,
        // },
        {
            field: "actions", headerName: "Actions",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <>
                        <Button
                            sx={{
                                "background": theme.palette.error.dark,
                                "color": "#fff",
                                "margin": "2px"
                            }}
                            startIcon={<DeleteIcon />}
                            variant="contained"
                            // color={}
                            onClick={() => handleDeleteRow(id)}
                        >
                            Delete
                        </Button>
                    </>
                );
            }
        },

    ];

    return (
        <Box>
            <Stack direction={"row"}>
                <Header
                    title="User"
                    subTitle="Here are all the Users in the store"
                />

            </Stack>
            <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
                <DataGrid
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    rows={user}
                    // @ts-ignore
                    columns={columns}

                />
            </Box>
        </Box>
    )
}

export default User