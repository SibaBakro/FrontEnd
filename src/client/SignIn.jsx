import React, { useState, useEffect } from "react"
import axios from "axios"
// @ts-ignore
import logo from "../assets/zuhra.png"
import { Alert, Avatar, Button, Input, MenuItem, Paper, Box, useTheme, Snackbar, Stack, Typography, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { grey } from '@mui/material/colors';
import { pink } from '@mui/material/colors';
import { useForm } from "react-hook-form";
const numberRegex = /^[1-9][0-9]*$/;
const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignIn = () => {
    document.title = 'sign-in'
    const navigate = useNavigate()
    const theme = useTheme();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = () => {
        setLoading(true)
        const data = {
            email: email,
            password: password,
        }
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, data
        )
            .then((response) => {
                localStorage.setItem('zuhra_token', response.data.token)
                console.log(response.data.token);
                setLoading(false)
                navigate('/')
            }).catch((error) => {
                console.error(error)
                setLoading(false)
                alert('email or password is incorrect')
            })
    }
    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-slate-50 h-screen">

            <Box sx={{
                display: "flex", justifyContent: "center",
                alignItems: "center", height: "100%", background: ""
            }}>

                <Paper
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                        // flex: 1,
                        width: "400px",
                        background: grey[200],
                        padding: "20px",
                        // marginTop: "80px",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-28 w-auto" src={logo} alt="Your Company" />
                        <h2 className="0 text-center text-4xl font-bold leading-9 tracking-tight text-pink-600">Sign in</h2>
                    </div>

                    <TextField
                        error={Boolean(errors.email)}
                        helperText={
                            Boolean(errors.email)
                                ? "This field is required & email"
                                : null
                        }
                        {...register("email", { required: true, pattern: regEmail })}
                        sx={{ flex: "1", width: "100%" }}
                        label={'E-mail'}
                        variant="filled"
                        // @ts-ignore
                        // value={titleEn}
                        // @ts-ignore
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        error={Boolean(errors.password)}
                        helperText={
                            Boolean(errors.password)
                                ? "This field is required & min 8 character"
                                : null
                        }
                        {...register("password", { required: true, min: 8 })}
                        sx={{ flex: "1", width: "100%" }}
                        label={'Password'}
                        variant="filled"
                        type="password"
                        // @ts-ignore
                        // value={category_name_ar}
                        // @ts-ignore
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        sx={{ textTransform: "capitalize", background: pink[600] }}
                        variant="contained"
                    >
                        Sign in
                        {loading ? <CircularProgress sx={{ color: '#fff' }} /> : null}
                    </Button>
                    <div>
                        <button type="button" onClick={() => { navigate('/signUp') }}>Sign up</button>
                    </div>
                </Paper>
            </Box>
        </div>
    )
}

export default SignIn