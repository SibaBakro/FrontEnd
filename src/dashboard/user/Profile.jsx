import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Alert, Avatar, Box, Button, Snackbar, Stack, TextField, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
const Profile = () => {
    document.title = 'Dashboard Profile'

    const theme = useTheme()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            console.log(response.data.user)
            setName(response.data.user.name)
            setAddress(response.data.user.address)
            setPhone(response.data.user.phone)
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

        const formData = new FormData();

        if (name != null) {
            formData.append('name', name);
        }
        if (address != null) {
            formData.append('phone', phone);
        }
        if (address != null) {
            formData.append('address', address);
        }

        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/updateUser`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },

        }).then((response) => { });
        handleClick();
        // location.reload()
    };
    return (
        <Box>
            <Stack direction={"row"}>
                <Header
                    title="Profile"
                    subTitle="Here you can edit your profile"
                />

            </Stack>
            <Box sx={{ height: 650, width: "99%", mx: "auto" }}>

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
                            error={Boolean(errors.name)}
                            helperText={
                                Boolean(errors.name)
                                    ? "This field is required & min 3 character"
                                    : null
                            }
                            {...register("name", { required: name == '' ? true : false, minLength: 3 })}
                            sx={{ flex: 1 }}
                            label="Name"
                            variant="filled"
                            // @ts-ignore
                            value={name}
                            // @ts-ignore
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            error={Boolean(errors.phone)}
                            helperText={
                                Boolean(errors.phone)
                                    ? "This field is required & min 3 character"
                                    : null
                            }
                            {...register("phone", { required: phone == '' ? true : false, minLength: 3 })}
                            sx={{ flex: 1 }}
                            label="Phone"
                            variant="filled"
                            // @ts-ignore
                            value={phone}
                            // @ts-ignore
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                            error={Boolean(errors.address)}
                            helperText={
                                Boolean(errors.address)
                                    ? "This field is required & min 3 character"
                                    : null
                            }
                            {...register("address", { required: address == '' ? true : false, minLength: 3 })}
                            sx={{ flex: 1 }}
                            label="Address"
                            variant="filled"
                            // @ts-ignore
                            value={address}
                            // @ts-ignore
                            onChange={(e) => setAddress(e.target.value)}
                        />

                    <Box sx={{ textAlign: "right" }}>
                        <Button
                            type="submit"
                            sx={{ textTransform: "capitalize" }}
                            variant="contained"
                        >
                            Update your Profile
                        </Button>

                        <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
                                profile updated successfully
                            </Alert>
                        </Snackbar>
                    </Box>
                </Box></Box>
        </Box>
    )
}

export default Profile