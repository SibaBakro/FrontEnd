import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// @ts-ignore
import logo from "../assets/zuhra.png"

const Footer = () => {

    const element = document.documentElement
    var date = new Date()

  
   
    return (
        <>
            <div className='h-4 bg-pink-500'></div>
            <div className='bg-slate-800'>
                <div className="flex flex-col md:flex-row justify-center items-center h-[800px] md:h-[380px]">
                    <div className="p-4 w-[300px]">
                        <div className='flex space-x-2'>
                            <img src={logo} className="w-32 h-32 cursor-pointer" title="this is logo in footer"
                                alt="logo in footer" />
                            {/* <h1 className="text-3xl text-orange-500 font-bold">bashar_store</h1> */}
                        </div>

                        <p className="text-lg text-white">We have all kinds of clothes</p>
                        <i
                            className='bx bxl-facebook-square text-3xl text-white  cursor-pointer hover:bg-white hover:text-gray-700 rounded-full'></i>
                        <i
                            className='bx bxl-whatsapp-square text-3xl text-white  cursor-pointer hover:bg-white hover:text-gray-700 rounded-full'></i>
                        <i
                            className='bx bxl-instagram-alt text-3xl text-white  cursor-pointer hover:bg-white hover:text-gray-700 rounded-full'></i>
                        <i
                            className='bx bxl-linkedin-square text-3xl text-white  cursor-pointer hover:bg-white hover:text-gray-700 rounded-full'></i>
                    </div>
                    <div className="p-4 flex flex-col text-white space-y-2 w-[300px]">
                        <h1 className="text-3xl text-green-500 font-bold">Links</h1>
                        <Link to="/" className="text-xl hover:text-slate-300">Home</Link>
                        <Link to="/category" className="text-xl hover:text-slate-300">Category</Link>
                        <Link to="about" className="text-xl hover:text-slate-300">About</Link>
                        <Link to="contact" className="text-xl hover:text-slate-300">Contact us</Link>
                        <Link to="favorite" className="text-xl hover:text-slate-300">Favorite</Link>
                    </div>
                    <div className="p-4 flex flex-col text-white  space-y-2 w-[300px]">
                        <h1 className="text-3xl text-blue-500 font-bold">Contact us</h1>
                        <a href="#" className="text-x hover:text-slate-300">support@zuhra.com</a>
                        <a href="#" className="text-xl  hover:text-slate-300">+9639478387438</a>
                        <a href="#" className="text-xl  hover:text-slate-300">+0937734774</a>
                    </div>
                </div>
                <div className="h-10 bg-slate-600">
                    <p className="text-lg md:text-2xl text-center text-blue-200 font-bold">{date.getFullYear()} © Publishing Rights Reserved</p>
                </div>
            </div>
        </>
    )
}

export default Footer