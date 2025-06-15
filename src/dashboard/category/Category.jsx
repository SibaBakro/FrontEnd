import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Avatar, Box, Button, Stack, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Category = () => {
    document.title = 'Dashboard Category'

    const theme = useTheme();
    const [category, setCategory] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/category/index`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            console.log(response.data.category)
            setCategory(response.data.category)
        }).catch((error) => {
            console.error(error)
        })

    }, [count])
    const handleDeleteRow = (id) => {
        if (window.confirm("Are you sure you want to delete it ?")) {
            // @ts-ignore
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/category/destroy/${id}`, {
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
            field: "category_image", headerName: "Image",
            flex: 1,
            renderCell: ({ row: { category_image } }) => {
                return (

                    <Avatar
                        // @ts-ignore
                        src={import.meta.env.VITE_BACKEND_URL + "/" + category_image} alt="" />
                );
            }
        },
        {
            field: "category_name",
            headerName: "Name",
            cellClassName: "name-column--cell",
            flex: 1,

        },
        {
            field: "category_desc",
            headerName: "Description",
            flex: 1,
        },
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
                        <Link to={`/dashboard/editCategory/${id}`}>
                            <Button
                                sx={{
                                    "background": theme.palette.success.main,
                                    "color": "#fff",
                                    "margin": "2px"
                                }}
                                startIcon={<EditIcon />}
                                variant="contained"
                            // color={}
                            >
                                Edit
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
                    title="Category"
                    subTitle="Here are all the Categories in the store"
                />
                <Box flexGrow={1} />
                <Link to={`/dashboard/createCategory`}><Button
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
                >Add</Button></Link>
            </Stack>
            <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
                <DataGrid
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    rows={category}
                    // @ts-ignore
                    columns={columns}

                />
            </Box>
        </Box>
    )
}

export default Category