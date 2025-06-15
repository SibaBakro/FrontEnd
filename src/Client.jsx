import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Chat from './components/Chat'
import ChatIcon from '@mui/icons-material/Chat';
const Client = () => {
    // const element = document.documentElement
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className='sticky top-0 z-10'>
                <Navbar />
            </div>
            <Outlet />
            <Footer />
            {open ?
                <div className='sticky bottom-16 left-2 w-[400px] h-[600px] border border-black bg-slate-300 rounded-lg overflow-scroll'>
                    <Chat />
                </div> : null}
            <div className='sticky bottom-1 left-2 p-2 bg-pink-500 hover:bg-pink-400 w-[100px] rounded-lg'>
                <button onClick={() => { open ? setOpen(false) : setOpen(true) }} >
                    Chat
                    <ChatIcon className='  p-2 rounded-full' style={{ fontSize: "40px", color: '#000' }} />
                </button>
            </div>
        </>
    )
}

export default Client