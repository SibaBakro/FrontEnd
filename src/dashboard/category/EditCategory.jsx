import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Avatar, Button, Input, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import axios from 'axios';

const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const EditCategory = () => {
    document.title = 'Dashboard Update Category'

    const { id } = useParams();
    const [category_name, setCategory_name] = useState('')
    const [category_desc, setCategory_desc] = useState('')
    const [category_image, setCategory_image] = useState()
    const [image, setImage] = useState()
    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/category/show/${id}`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            }
        }).then(
            (response) => {
                setCategory_name(response.data.category.category_name)
                setCategory_desc(response.data.category.category_desc)
                setCategory_image(response.data.category.category_image)
                console.log(response.data.category)
            }
        )
    }, [])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const onSubmit = () => {
        // console.log("doneeeeeeeeeeee");
        const formData = new FormData();
        formData.append('category_name', category_name);
        formData.append('category_desc', category_desc);
        if (image != null) {
            formData.append('category_image', image);
        }
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/category/update/${id}`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => { });
        handleClick();
    };

    return (
        <Box>
            <Header title="Edit Category" subTitle="Here the Category is modified" />
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
                noValidate
                autoComplete="off"
            >

                <TextField
                    error={Boolean(errors.category_name)}
                    helperText={
                        Boolean(errors.category_name)
                            ? "This field is required & min 3 character"
                            : null
                    }
                    {...register("category_name", { required: category_name == '' ? true : false, minLength: 3 })}
                    sx={{ flex: 1 }}
                    label="Category Name"
                    variant="filled"
                    // @ts-ignore
                    value={category_name}
                    // @ts-ignore
                    onChange={(e) => setCategory_name(e.target.value)}
                />

                <TextField
                    error={Boolean(errors.category_desc)}
                    helperText={
                        Boolean(errors.category_desc)
                            ? "This field is required & min 10 character"
                            : null
                    }
                    {...register("category_desc", { required: category_desc == '' ? true : false, minLength: 10 })}
                    sx={{ flex: 1 }}
                    label="Category Description"
                    variant="filled"
                    // @ts-ignore
                    value={category_desc}
                    // @ts-ignore
                    onChange={(e) => setCategory_desc(e.target.value)}
                />

                <img style={{ width: "200px" }} src={
                    // @ts-ignore
                    import.meta.env.VITE_BACKEND_URL + "/" + category_image}
                    alt="image" />

                <Input
                    type="file"
                    // @ts-ignore
                    onChange={(e) => setImage(e.target.files[0])}

                    inputProps={{ accept: 'image/*' }} // Specify accepted file types (e.g., images)
                    fullWidth // Take up the full width of its container
                />

                {/* <input
                    type="file"
                    accept="image/*"
                    name="category_image"
                    // onChange={handleFileChange}
                    style={{ fontSize: "22px" }}
                    // @ts-ignore
                    onChange={(e) => setImage(e.target.files[0])}
                /> */}


                <Box sx={{ textAlign: "right" }}>
                    <Button
                        type="submit"
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                    >
                        Update Category
                    </Button>

                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
                            Category updated successfully
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>


        </Box>

    )
}

export default EditCategory