import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { pink } from '@mui/material/colors';

const BodyCart = () => {
    const [cart, setCart] = useState([])
    const [count, setCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState()
    const [invoice_address, setInvoice_address] = useState(null)
    const [loadingCart, setLoadingCart] = useState(true)
    const [loadingBuy, setLoadingBuy] = useState(false)
    const theme = useTheme();

    useEffect(() => {
        const data = []
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/index`, data, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        })
            .then((response) => {
                // console.log(response.data.cart, 'cart')
                setCart(response.data.cart)
                setLoadingCart(false)
            })
        //   const  data = []
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/invoice/totalPrice`, data, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        })
            .then((response) => {
                // console.log(response.data.totalPrice, 'totalPrice')
                setTotalPrice(response.data.totalPrice)
            })
    }, [count])

    const handleBuy = () => {
        setLoadingBuy(true)
        const data = {
            invoice_address: invoice_address
        }
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/invoice/store`, data, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            // console.log(response.data, 'buy')
            setLoadingBuy(false)
        }).catch((error) => {
            console.error(error, 'error')
            setLoadingBuy(false)
        })
        setInvoice_address('')
        setCount(x => x + 1)
    }

    const handleDeleteRow = (id) => {
        if (window.confirm("Are you sure you want to delete it ?")) {
            // @ts-ignore
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/destroy/${id}`, {
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
                },
            })
            setCount(x => x + 1)
        }
    }
    const handleInputChange = (event) => {
        setInvoice_address(event.target.value);
    };
    return (
        <div className=''>
            <main className='bg-slate-50 flex flex-col md:flex-row md:w-10/12 mx-auto'>
                {/* section 1 */}
                <div className='py-10 md:w-1/2'>
                    <h1 className='text-3xl md:text-4xl m-6'>Your Cart</h1>
                    {loadingCart ? <CircularProgress sx={{ color: pink[600], margin: "40px" }} /> :
                        cart.map((item, index) => (

                            <div className='flex m-4' key={index}>
                                <img src={
                                    // @ts-ignore
                                    import.meta.env.VITE_BACKEND_URL + "/" + item.product_image1} className="rounded-xl w-[140px] h-[140px]" alt='' />
                                <div className='m-2'>
                                    <h1 className='text-3xl'>{item.product_name}</h1>
                                    <h2 className='text-xl text-slate-500 '> {item.cart_quantity} * {item.product_price}$</h2>
                                    {/* <h3 className='text-xl text-slate-500'>tax :  {item.tax_percent == null ? <>0 $</> : item.tax_percent} </h3> */}
                                    <p className='text-xl text-slate-500 '> {item.product_desc} </p>
                                    <button
                                        onClick={() => handleDeleteRow(item.carts_id)}
                                        className="bg-red-500 block m-1 rounded-lg hover:bg-red-400 px-2 py-1 duration-300 font-medium text-xl text-white ">delete</button>
                                </div>
                            </div>
                        ))}
                </div>
                {/* end section 1 */}
                {/* section 2 */}
                <div className='py-10 md:w-1/2'>
                    <h1 className='text-3xl md:text-4xl m-6'>Order Summary</h1>
                    <div className='flex m-6'>
                        <h1 className='p-2 text-xl'>Total Price : {totalPrice}</h1>
                        {/* <h1 className='text-xl m-2 text-gray-200'> : {totalPrice == 0 ? null : totalPrice} </h1> */}
                    </div>

                    <div className='p-4'>
                        <div>
                            <textarea className='bg-yellow-300 text-xl p-1' placeholder='write your address..?'
                                onChange={handleInputChange}
                                value={invoice_address}
                                cols={30} rows={6}>

                            </textarea>
                            {/* <h1 className='text-xl'>price_after_discount :348</h1> */}
                            <div>
                                <button onClick={handleBuy} className='bg-pink-500 text-xl text-white hover:bg-pink-400 duration-300 p-2 rounded-xl m-2 w-[240px] md:w-[300px]'>
                                    Buy Now
                                    {loadingBuy ? <CircularProgress sx={{ color: '#fff' }} /> : null}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </main >
        </div >
    )
}

export default BodyCart