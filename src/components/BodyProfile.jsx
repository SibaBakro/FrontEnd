import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Alert, Avatar, Button, Input, MenuItem, Paper, useTheme, Snackbar, Stack, Typography, TextField, Box } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
// import { black } from '@mui/material/colors';
import { useForm } from "react-hook-form";
import { pink } from '@mui/material/colors';

const BodyProfile = () => {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const [image, setImage] = useState()
    const [count, setCount] = useState(0)
    const [loadingLogout, setLoadingLogout] = useState(false)
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false)
    const [loadingInvoice, setLoadingInvoice] = useState(false)
    const [invoice, setInvoice] = useState([])
    const theme = useTheme();

    const navigate = useNavigate()
    useEffect(() => {
        setLoadingProfile(true)
        setLoadingInvoice(true)
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            // console.log(response.data.user, 'user')
            setName(response.data.user.name)
            setPhone(response.data.user.phone)
            setAddress(response.data.user.address)
            setLoadingProfile(false)
        }).catch((error) => {
            console.error(error)
            setLoadingProfile(false)
        })

        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/invoice/getInvoiceById`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            console.log(response.data.invoice, 'invoice')
            setLoadingInvoice(false)
            setInvoice(response.data.invoice)
        }).catch((error) => {
            console.error(error, 'error')
            setLoadingInvoice(false)
        })

    }, [count])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = () => {

        setLoadingSave(true)
        const formData = new FormData();
        if (name != null) {
            formData.append('name', name);
        }
        if (phone != null) {
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

        }).then((response) => {
            // console.log(response.data)
            setCount(x => x + 1)
            setLoadingSave(false)
            alert('Process Completed')
        }).catch((error) => {
            console.error(error)
            setLoadingProfile(false)
            alert('Data Error')
        });
    }
    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to sign out ?")) {
            setLoadingLogout(true)
            const data = []
            // @ts-ignore
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, data, {
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
                },
            }).then((response) => {
                setLoadingLogout(false)
                localStorage.removeItem('zuhra_token')
                navigate('/')
            }).catch((error) => {
                setLoadingLogout(false)
            })
        }
    }
    return (
        <div className=''>
            <main className='bg-slate-50 w-10/12 mx-auto'>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="mt-4 text-2xl md:text-5xl uppercase font-bold ">profile</h1>
                    <div className="h-1 w-28 mt-2"></div>
                </div>
                <div className="">
                    <div className='grid grid-cols-1 md:grid-cols-2 p-4 mx-auto'>
                        <div className='mx-auto m-6'>
                            <h1 className='text-xl '>Name</h1>
                            <input type='text' className='border border-black  p-1 md:w-[300px] rounded-lg '
                                // @ts-ignore
                                value={name}
                                // @ts-ignore
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='mx-auto m-6'>
                            <h1 className='text-xl'>Phone</h1>
                            <input type='text' className='border border-black p-1 md:w-[300px] rounded-lg'
                                // @ts-ignore
                                value={phone}
                                // @ts-ignore
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className='mx-auto m-6'>
                            <h1 className='text-xl'>Address</h1>
                            <input type='text' className='border border-black p-1 md:w-[300px] rounded-lg'

                                // @ts-ignore
                                value={address}
                                // @ts-ignore
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className='mx-auto m-6 flex gap-1'>
                            <div>
                                <button type="submit" className='bg-pink-500 hover:bg-pink-400 rounded-lg p-2 text-white'
                                    onClick={onSubmit}
                                >
                                    save
                                    {loadingSave ? <CircularProgress sx={{ color: '#fff', fontSize: "10px" }} /> : null}
                                </button>
                            </div>
                            <div>
                                <button className='bg-pink-500 hover:bg-pink-400 rounded-lg p-2 text-white'
                                    onClick={handleSignOut}
                                >
                                    Sign out
                                    {loadingLogout ? <CircularProgress sx={{ color: '#fff', fontSize: "10px" }} /> : null}
                                </button>
                            </div>
                        </div>
                        <div className='py-10 px-4'>
                            <h1 className='text-3xl text-green-600 md:text-4xl m-6'>My Invoices :</h1>
                            <div className='m-4 flex'>
                                <h1 className='text-xl p-3'><b> price</b></h1>
                                <h2 className='text-xl p-3'> <b> shipping</b></h2>
                                <h3 className='text-xl p-3'> <b> delivery </b></h3>
                                <h1 className='text-xl p-3'> <b> address </b> </h1>
                            </div>
                            <div className='bg-black  h-1'></div>
                            {loadingInvoice ? <CircularProgress sx={{ color: pink[600], margin: "40px" }} /> :
                                invoice.map((item, index) => (
                                    <div className='flex m-4' key={index}>
                                        <h1 className='text-xl p-3'>{item.invoice_total_price}</h1>
                                        <h2 className='text-xl p-3 '> {item.invoice_shipping}</h2>
                                        <h3 className='text-xl p-3'>  {item.invoice_delivery} </h3>
                                        <h1 className='text-xl p-3'> {item.invoice_address} </h1>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default BodyProfile