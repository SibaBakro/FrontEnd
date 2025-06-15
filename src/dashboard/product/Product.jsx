import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Avatar, Box, Button, Stack, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Product = () => {
    document.title = 'Dashboard Product'

    const theme = useTheme()
    const [product, setProduct] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/product/index`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            console.log(response.data.product)
            setProduct(response.data.product)
        }).catch((error) => {
            console.error(error)
        })

    }, [count])
    const handleDeleteRow = (id) => {
        if (window.confirm("Are you sure you want to delete it ?")) {
            // @ts-ignore
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/product/destroy/${id}`, {
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
                },
            })
            setCount(x => x + 1)
        }
    }
    const columns = [
        { field: "id", headerName: "ID", type: "number", width: 30 },
        {
            field: "product_name",
            headerName: "Name",
            // flex: 1,
        },
        {
            field: "product_desc",
            headerName: "Description",
            // flex: 1,
        },
        {
            field: "product_quantity",
            headerName: "Quantity",
            cellClassName: "name-column--cell",
            // flex: 1,

        },
        {
            field: "product_price",
            headerName: "Price",
            cellClassName: "name-column--cell",
            // flex: 1,
        },
        {
            field: "category", headerName: "Category",
            // flex: 1,
            renderCell: ({ row: { category } }) => {
                return (

                    <p>{category.category_name}</p>
                );
            }
        },
        {
            field: "product_discount",
            headerName: "Discount",
            cellClassName: "name-column--cell",
            // flex: 1,
        },
        {
            field: "product_image1", headerName: "Image",
            // flex: 1,
            renderCell: ({ row: { product_image1 } }) => {
                return (

                    <Avatar
                        // @ts-ignore
                        src={import.meta.env.VITE_BACKEND_URL + "/" + product_image1} alt="" />
                );
            }
        },
        {
            field: "product_image2", headerName: "Image",
            // flex: 1,
            renderCell: ({ row: { product_image2 } }) => {
                return (

                    <Avatar
                        // @ts-ignore
                        src={import.meta.env.VITE_BACKEND_URL + "/" + product_image2} alt="" />
                );
            }
        },
        {
            field: "product_image3", headerName: "Image",
            // flex: 1,
            renderCell: ({ row: { product_image3 } }) => {
                return (

                    <Avatar
                        // @ts-ignore
                        src={import.meta.env.VITE_BACKEND_URL + "/" + product_image3} alt="" />
                );
            }
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
                        <Link to={`/dashboard/editProduct/${id}`}>
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
                    title="Product"
                    subTitle="Here are all the Products in the store"
                />
                <Box flexGrow={1} />
                <Link to={`/dashboard/createProduct`}><Button
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
                    rows={product}
                    // @ts-ignore
                    columns={columns}

                />
            </Box>
        </Box>
    )
}

export default Product