import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Avatar, Button, InputLabel, MenuItem, NativeSelect, Select, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { Input } from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import axios from 'axios';

const numberRegex = /^[1-9][0-9]*$/;
const imageRegex = /<img\\b[^>]*>/;
const EditProduct = () => {
    document.title = 'Dashboard Uodate Product'

    const { id } = useParams()
    const [product_price, setProduct_price] = useState('')
    const [product_quantity, setProduct_quantity] = useState('')
    const [product_name, setProduct_name] = useState('')
    const [product_desc, setProduct_desc] = useState('')
    const [product_discount, setProduct_discount] = useState('')
    const [product_image1, setProduct_image1] = useState('')
    const [product_image2, setProduct_image2] = useState('')
    const [product_image3, setProduct_image3] = useState('')
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()

    const [category, setCategory] = useState([])



    // const handleChange = (event) => {
    //     setCategory_id(event.target.value);
    // };

    useEffect(() => {

        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/product/show/${id}`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
                'lang': "en",
            },
        }).then((response) => {
            console.log(response.data.product)
            setProduct_price(response.data.product.product_price)
            setProduct_quantity(response.data.product.product_quantity)
            setProduct_discount(response.data.product.product_discount)
            setProduct_name(response.data.product.product_name)
            setProduct_desc(response.data.product.product_desc)
            setProduct_image1(response.data.product.product_image1)
            setProduct_image2(response.data.product.product_image2)
            setProduct_image3(response.data.product.product_image3)
        }).catch((error) => {
            console.error(error)
        })

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
        // alert("msl")
        // return;
        const formData = new FormData();
        formData.append('product_price', product_price);
        formData.append('product_quantity', product_quantity);
        formData.append('product_discount', product_discount);
        formData.append('product_name', product_name);
        formData.append('product_desc', product_desc);
        if (image1 != null) {
            formData.append('product_image1', image1);
        }
        if (image2 != null) {
            formData.append('product_image2', image2);
        }
        if (image3 != null) {
            formData.append('product_image3', image3);
        }

        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/product/update/${id}`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => { }).catch((error) => { alert(error) });
        handleClick();
    };
    return (
        <Box>
            <Header title="Update Product" subTitle="Here you can update Products" />

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
                <Stack sx={{ gap: 2 }} direction={"row"}>
                    <TextField
                        error={Boolean(errors.product_price)}
                        helperText={
                            Boolean(errors.product_price)
                                ? "This field is required & number"
                                : null
                        }
                        {...register("product_price", { required: product_price == '' ? true : false, pattern: numberRegex })}
                        sx={{ flex: 1 }}
                        label="Price"
                        variant="filled"
                        value={product_price}
                        // @ts-ignore
                        onChange={(e) => setProduct_price(e.target.value)}
                    />

                    <TextField
                        error={Boolean(errors.product_quantity)}
                        helperText={
                            Boolean(errors.product_quantity)
                                ? "This field is required & number"
                                : null
                        }
                        {...register("product_quantity", { required: product_quantity == '' ? true : false, pattern: numberRegex })}
                        sx={{ flex: 1 }}
                        label="Product Quantity"
                        variant="filled"
                        value={product_quantity}
                        // @ts-ignore
                        onChange={(e) => setProduct_quantity(e.target.value)}
                    />
                    <TextField
                        error={Boolean(errors.product_discount)}
                        helperText={
                            Boolean(errors.product_discount)
                                ? "This field is required & number"
                                : null
                        }
                        {...register("product_discount", { required: product_discount == '' ? true : false, pattern: numberRegex, min: 0, max: 100 })}
                        sx={{ flex: 1 }}
                        label="Discount"
                        variant="filled"
                        value={product_discount}
                        // @ts-ignore
                        onChange={(e) => setProduct_discount(e.target.value)}
                    />
                </Stack>
                <TextField
                    error={Boolean(errors.product_name)}
                    helperText={
                        Boolean(errors.product_name)
                            ? "This field is required & min 3 character"
                            : null
                    }
                    {...register("product_name", { required: product_name == '' ? true : false, minLength: 3 })}
                    sx={{ flex: 1 }}
                    label="Product Name"
                    variant="filled"
                    value={product_name}
                    // @ts-ignore
                    onChange={(e) => setProduct_name(e.target.value)}
                />

                <TextField
                    error={Boolean(errors.product_desc)}
                    helperText={
                        Boolean(errors.product_desc)
                            ? "This field is required & min 10 character"
                            : null
                    }
                    {...register("product_desc", { required: product_desc == "" ? true : false, minLength: 10 })}
                    sx={{ flex: 1 }}
                    label="Product Description"
                    variant="filled"
                    value={product_desc}
                    // @ts-ignore
                    onChange={(e) => setProduct_desc(e.target.value)}
                />

                <Stack gap={2} direction={"row"}>
                    {/* {alert(product_image1)} */}
                    <img style={{ width: "200px" }} src={
                        // @ts-ignore
                        import.meta.env.VITE_BACKEND_URL + "/" + product_image1}
                        alt="image" />
                    <img style={{ width: "200px" }} src={
                        // @ts-ignore
                        import.meta.env.VITE_BACKEND_URL + "/" + product_image2}
                        alt="image" />
                    <img style={{ width: "200px" }} src={
                        // @ts-ignore
                        import.meta.env.VITE_BACKEND_URL + "/" + product_image3}
                        alt="image" />
                </Stack>
                <Stack direction={"row"}>

                    <Input
                        type="file"
                        error={Boolean(errors.image1)}
                        {...register("image1", { pattern: imageRegex })}
                        // @ts-ignore
                        style={{ fontSize: "18px" }}
                        inputProps={{ accept: 'image/*' }} // Specify accepted file types (e.g., images)
                        fullWidth // Take up the full width of its container
                        // @ts-ignore
                        onChange={(e) => setImage1(e.target.files[0])}
                    />
                    <Input
                        type="file"
                        error={Boolean(errors.image2)}
                        {...register("image2", { pattern: imageRegex })}
                        // @ts-ignore
                        style={{ fontSize: "18px" }}
                        inputProps={{ accept: 'image/*' }} // Specify accepted file types (e.g., images)
                        fullWidth // Take up the full width of its container
                        // @ts-ignore
                        onChange={(e) => setImage2(e.target.files[0])}
                    />

                    <Input
                        type="file"
                        error={Boolean(errors.image3)}
                        {...register("image3", { pattern: imageRegex })}
                        // @ts-ignore
                        style={{ fontSize: "18px" }}
                        inputProps={{ accept: 'image/*' }} // Specify accepted file types (e.g., images)
                        fullWidth // Take up the full width of its container
                        // @ts-ignore
                        onChange={(e) => setImage3(e.target.files[0])}
                    />
                </Stack>

                <Box sx={{ textAlign: "right" }}>
                    <Button
                        type="submit"
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                    >
                        Update Product
                    </Button>

                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
                            Product updated successfully
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </Box>
    )
}

export default EditProduct