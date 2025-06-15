import React, { useState, useEffect } from 'react'
// @ts-ignore
import logo from "../assets/zuhra.png"
import { Link, NavLink, useLocation } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import DehazeIcon from '@mui/icons-material/Dehaze';

const Navbar = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleClick = () => {
        if (isOpen == true) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }
    return (
        <div className='border-b-2  bg-white'>
            <nav className="flex flex-row items-center justify-between px-20 bg-white ">
                <img src={logo} className="w-32 mt-3" title="this is logo website" alt="logo" />

                <div className='md:hidden' onClick={handleClick}>
                    {isOpen ?
                        <CloseIcon className='' style={{ fontSize: "30px" }} />
                        :
                        <DehazeIcon className='' style={{ fontSize: "30px" }} />
                    }
                </div>
                <div className="hidden md:block">
                    <ul className="mr-auto flex  text-xl md:text-2xl">
                        <li><NavLink to="/" className="text-black font-semibold hover:text-pink-400 duration-300 px-4">Home</NavLink></li>
                        <li><NavLink to="/category" className="text-black font-semibold hover:text-pink-400 duration-300 px-4">Category</NavLink></li>
                        <li><NavLink to="/about" className="text-black font-semibold hover:text-pink-400 duration-300 px-4">About</NavLink></li>
                        <li><NavLink to="/contact" className="text-black font-semibold hover:text-pink-400 duration-300 px-4">Contact us</NavLink></li>
                        <li><NavLink to="/favorite" className="text-black font-semibold hover:text-pink-400 duration-300 px-4"> Favorite</NavLink></li>
                    </ul>
                </div>
                <div className='hidden md:block'>
                    <Link to='/signIn'> <IconButton color="inherit">
                        <LoginIcon className='bg-pink-500  p-2 rounded-full' style={{ fontSize: "40px", color: "#FFF" }} />
                    </IconButton>
                    </Link>
                    <Link to='/profile'> <IconButton color="inherit">
                        <PersonIcon className='bg-pink-500 p-2 rounded-full' style={{ fontSize: "40px", color: "#FFF" }} />
                    </IconButton>
                    </Link>
                    <Link to="/cart"> <IconButton color="inherit">
                        <ShoppingCartIcon className='bg-pink-500 p-2 rounded-full' style={{ fontSize: "40px", color: "#FFF" }} />
                    </IconButton>
                    </Link>
                </div>

            </nav>
            {isOpen && (
                <div id="dropdownMenu"
                    className="py-4 md:hidden">
                    <ul className="mt-4 flex flex-col justify-center items-center">
                        <li><NavLink to="/" className="text-2xl font-bold mx-auto m-4">Home</NavLink></li>
                        <li><NavLink to="/category" className="text-2xl font-bold mx-auto m-4 ">Category</NavLink></li>
                        <li><NavLink to="/about" className="text-2xl font-bold mx-auto m-4 ">About</NavLink></li>
                        <li><NavLink to="/contact" className="text-2xl font-bold mx-auto m-4">Contact us</NavLink></li>
                        <li><NavLink to="/favorite" className="text-2xl font-bold mx-auto m-4">Favorite</NavLink></li>
                        <li>
                            <Link to='/signIn'> <IconButton color="inherit">
                                <LoginIcon className='bg-pink-500 p-2 rounded-full' style={{ fontSize: "40px", color: "#FFF" }} /> <span className='m-2 text-2xl font-bold'> Sign in </span>
                            </IconButton>
                            </Link>
                        </li>
                        <li>
                            <Link to='/profile'> <IconButton color="inherit">
                                <PersonIcon className='bg-pink-500 p-2 rounded-full' style={{ fontSize: "40px", color: "#FFF" }} /><span className='m-2 text-2xl font-bold'> Profile </span>
                            </IconButton>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart"> <IconButton color="inherit">
                                <ShoppingCartIcon className='bg-pink-500 p-2 rounded-full' style={{ fontSize: "40px", color: "#FFF" }} />  <span className='m-2 text-2xl font-bold '> Cart </span>
                            </IconButton>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar