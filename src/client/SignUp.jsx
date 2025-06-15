import React, { useState, useEffect } from "react"
import axios from "axios"
// @ts-ignore
import logo from "../assets/zuhra.png"
import { Alert, Avatar, Button, Input, MenuItem, Paper, useTheme, Snackbar, Stack, Typography, TextField, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { grey } from '@mui/material/colors';
import { pink } from '@mui/material/colors';
import { useForm } from "react-hook-form";
const numberRegex = /^[1-9][0-9]*$/;
const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUp = () => {
    document.title = 'sign-up'
    const navigate = useNavigate()
    const theme = useTheme();
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password_confirmation, setPassword_confirmation] = useState()
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
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
        }
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, data
        )
            .then((response) => {
                console.log(response.data.token);
                setLoading(false)
                navigate('/signIn')
            }).catch((error) => {
                console.error(error)
                setLoading(false)
                alert('email is token or password is not password confirmation')
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
                        <h2 className="0 text-center text-4xl font-bold leading-9 tracking-tight text-pink-600">Sign up</h2>
                    </div>

                    <TextField
                        error={Boolean(errors.name)}
                        helperText={
                            Boolean(errors.name)
                                ? "This field is required & min 3 character"
                                : null
                        }
                        {...register("name", { required: true, minLength: 3 })}
                        sx={{ flex: "1", width: "100%" }}
                        label={'Name'}
                        variant="filled"
                        // @ts-ignore
                        // value={category_name_ar}
                        // @ts-ignore
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        type="Password"
                        // @ts-ignore
                        // value={category_name_ar}
                        // @ts-ignore
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        error={Boolean(errors.password_confirmation)}
                        helperText={
                            Boolean(errors.password_confirmation)
                                ? "This field is required & min 8 character"
                                : null
                        }
                        {...register("password_confirmation", { required: true, min: 8 })}
                        sx={{ flex: "1", width: "100%" }}
                        label={'Password Confirmation'}
                        variant="filled"
                        type="password"
                        // @ts-ignore
                        // value={category_name_ar}
                        // @ts-ignore
                        onChange={(e) => setPassword_confirmation(e.target.value)}
                    />



                    <Button
                        type="submit"
                        sx={{ textTransform: "capitalize", background: pink[500] }}
                        variant="contained"
                    >
                        Sign up
                        {loading ? <CircularProgress sx={{ color: '#fff' }} /> : null}
                    </Button>
                    <div>
                        <button type="button" onClick={() => { navigate('/signIn')}}>Sign in</button>
                    </div>
                </Paper>


            </Box>
        </div>

    )
}

export default SignUp