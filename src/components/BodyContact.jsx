import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// @ts-ignore
import mall from "../assets/mall2.jpg"
// @ts-ignore
import chart from "../assets/chart.jpg"
import { Alert, Avatar, Button, Input, MenuItem, Paper, Box, useTheme, Snackbar, Stack, Typography, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import CircularProgress from '@mui/material/CircularProgress';

const BodyContact = () => {
    const theme = useTheme();
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSendEmail = () => {

        setLoading(true)
        const data = {
            name: name,
            email: email,
            message: message,
        }
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/sendEmail`, data, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('electronic_commerce')}`,
            },
        })
            .then((response) => {
                setLoading(false)
                setName('')
                setEmail('')
                setMessage('')
                alert('Process_completed')
            }).catch((error) => {
                console.error(error)
                setLoading(false)
                alert('data_error')
            });
    }
    return (
        <div className=''>
            <div className='h-8'></div>

            <header className="relative rounded-3xl w-10/12 mx-auto bg-cover h-[400px] md:h-[600px]" style={{ backgroundImage: `url(${mall})` }}>
                <div className=' rounded-3xl w-full h-[400px] md:h-[600px]  bg-[rgba(0,0,0,0.7)] flex flex-col justify-center items-center'>
                    <h1 className='text-white text-3xl md:text-5xl m-2'> Contact us</h1>
                    <div className="h-1 w-[80px] md:w-[180px] mt-2 bg-white"></div>

                </div>
            </header>

            <div className='h-8'></div>

            <main className=' flex flex-col md:flex-row md:w-10/12 mx-auto'>
                {/* section 1 */}
                <div className='p-2 md:p-10 bg-slate-100 md:w-1/2'>
                    <div>
                        <h1 className='text-2xl text-orange-500 md:text-4xl font-semibold'>Contact Information</h1>
                    </div>
                    <div className='p-4'>
                        <h1 className='text-2xl text-green-600 font-medium'>Address</h1>
                        <p className='text-xl '>Syria - Aleppo</p>
                    </div>
                    <div className='p-4'>
                        <h1 className='text-2xl text-green-600  font-medium'>Email</h1>
                        <p className='text-xl '>support@zuhra.com</p>
                    </div>
                    <div className='p-4'>
                        <h1 className='text-2xl text-green-600  font-medium'>Call us</h1>
                        <p className='text-xl'>+9639478387438</p>
                    </div>
                    <div className='p-4'>
                        <FacebookOutlinedIcon style={{ fontSize: "34px" }} className='cursor-pointer text-blue-500' />
                        <InstagramIcon style={{ fontSize: "34px" }} className='cursor-pointer text-amber-400' />
                    </div>
                </div>
                {/* end section 1 */}
                {/* section 2 */}
                <div className='p-2 md:p-10 bg-slate-200 md:w-1/2'>
                    <img src={chart} className='' />
                    {/* <h1 className='text-2xl text-orange-500 md:text-4xl font-semibold'>contact_us</h1>
                    <input type='text'  // @ts-ignore
                        onChange={(e) => setName(e.target.value)} placeholder='name' className='block w-[100%] p-2 border-2 border-slate-400  m-2' />
                    <input type='email'  // @ts-ignore
                        onChange={(e) => setEmail(e.target.value)} placeholder='email' className='block w-[100%] p-2 border-2 border-slate-400  m-2' />
                    <textarea rows={5}  // @ts-ignore
                        onChange={(e) => setMessage(e.target.value)} placeholder='message' className='block w-[100%] p-2 border-2 border-slate-400 m-2' >

                    </textarea>
                    <Button onClick={handleSendEmail} className='p-2' variant="contained" style={{ background: '#ff9800' }} >send<SendIcon />
                        {loading ? <CircularProgress sx={{ color: theme.palette.success.dark, fontSize: "10px" }} /> : null}
                    </Button> */}
                </div>
                {/* end section 2 */}
            </main>
            <div className='h-8'></div>


            {/* map */}
            <div className='w-10/12 mx-auto'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7226.2801006635245!2d55.15247950997903!3d25.097120101041796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6bfd047e7271%3A0xa422921dadbca8e!2sAvani%2B%20Palm%20View%20Dubai%20Hotel%20%26%20Suites!5e0!3m2!1sen!2s!4v1711575107909!5m2!1sen!2s" className='w-full' height="450"
                    style={{ border: "0" }}
                    // @ts-ignore
                    allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            {/* end map */}

            <div className='h-8'></div>

        </div>
    )
}

export default BodyContact