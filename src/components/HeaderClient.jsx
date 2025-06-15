import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
// @ts-ignore
import mall from "../assets/mall5.jpg"
// @ts-ignore
import mall1 from "../assets/phone.jpg"
// @ts-ignore
import mall2 from "../assets/trade.jpg"
// @ts-ignore
import mall3 from "../assets/laptop.jpg"
// @ts-ignore
import mall4 from "../assets/cart.jpg"
// @ts-ignore
import clientIcon from "../assets/clientIcon.jpeg"
// @ts-ignore
import productIcon from "../assets/productIcon.png"
// @ts-ignore
import categoryIcon from "../assets/categoryIcon.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const HeaderClient = () => {
    const navigate = useNavigate()

    const [selectImage, setSelectImage] = useState(mall1)
    const [category, setCategory] = useState()
    const [product, setProduct] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/homeDashboard`, {
            headers: {
                'Accept': "application/json",
            },
        }).then((response) => {
            setCategory(response.data.category)
            setProduct(response.data.product)
            setUser(response.data.user)
        }).catch((error) => {
            console.error(error)
        })

    }, [])
    return (
        <div className=''>
            <div className='h-8'></div>

            <header className="relative rounded-3xl w-10/12 mx-auto bg-cover h-[400px] md:h-[600px]" style={{ backgroundImage: `url(${mall})` }}>
                <div className=' rounded-3xl w-full h-[400px] md:h-[600px]  bg-[rgba(0,0,0,0.7)] flex flex-col justify-center items-center'>
                    <h1 className='text-white text-3xl md:text-5xl m-2'>There are modern and <span className='text-pink-500'> fashionable</span> clothes</h1>
                    <button onClick={() => { navigate('/category') }} className='text-white  text-2xl md:text-3xl mt-6 bg-pink-500 hover:bg-pink-400 duration-300 rounded-2xl p-2 md:p-4'>Our Category</button>
                </div>
            </header>

            <div className='h-8'></div>


            <main className='w-10/12 flex flex-col md:flex-row mx-auto rounded-3xl'>
                {/* section 1 */}
                <div className='p-2 md:p-10 bg-slate-200   md:w-1/2'>
                    <h1 className='text-3xl md:text-4xl font-semibold text-pink-500'>zuhra Store</h1>
                    <p className='text-2xl'>Zahra store contains the finest and latest types of clothing, and you can contact us via email or phone
                        You can also browse the products and categories, choose the appropriate product, and add it to the shopping cart, and we will ship the products at the appropriate time.</p>
                    <button
                        onClick={() => { navigate('/contact') }}
                        className='p-2 bg-pink-500  hover:bg-pink-400 duration-300 rounded-xl text-xl text-white mt-4'>Contact us</button>
                </div>
                {/* end section 1 */}
                {/* section 2 */}
                <div className='p-2 md:p-10 bg-slate-100  md:w-1/2 '>
                    <img src={selectImage} alt='image' className='w-[580px] h-[380px]' />
                    <div className='flex mt-4'>
                        <img src={mall1} alt='product' onClick={() => { setSelectImage(mall1) }} className='w-[60px] h-[60px] rounded-full border-pink-500 border-2 m-2 cursor-pointer' />
                        <img src={mall2} alt='product' onClick={() => { setSelectImage(mall2) }} className='w-[60px] h-[60px] rounded-full border-pink-500 border-2 m-2 cursor-pointer' />
                        <img src={mall3} alt='product' onClick={() => { setSelectImage(mall3) }} className='w-[60px] h-[60px] rounded-full border-pink-500 border-2 m-2 cursor-pointer' />
                        <img src={mall4} alt='product' onClick={() => { setSelectImage(mall4) }} className='w-[60px] h-[60px] rounded-full border-pink-500 border-2 m-2 cursor-pointer' />

                    </div>
                </div>
                {/* end section 2 */}
            </main>
            <div className='h-14'></div>

            <div className='flex justify-around w-10/12 mx-auto '>
                <div>
                    <img src={clientIcon} className='w-[180px]' />
                    <h1 className='text-center text-3xl'>Clients</h1>
                    <h1 className='text-center text-5xl mt-4 font-medium'>{user}</h1>
                </div>
                <div>
                    <img src={categoryIcon} className='w-[180px]' />
                    <h1 className='text-center text-3xl'>Categories</h1>
                    <h1 className='text-center text-5xl mt-4 font-medium'>{category}</h1>
                </div>
                <div>
                    <img src={productIcon} className='w-[180px]' />
                    <h1 className='text-center text-3xl'>Products</h1>
                    <h1 className='text-center text-5xl mt-4 font-medium'>{product}</h1>
                </div>
            </div>
            <div className='h-8'></div>

        </div>
    )
}

export default HeaderClient