import React from 'react'
// @ts-ignore
import mall from "../assets/mall1.jpg"
// @ts-ignore
import phoneCall from "../assets/phone.jpg"
import { useNavigate } from 'react-router-dom'

const BodyAbout = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className='h-8'></div>

            <header className="relative rounded-3xl w-10/12 mx-auto bg-cover h-[400px] md:h-[600px]" style={{ backgroundImage: `url(${mall})` }}>
                <div className=' rounded-3xl w-full h-[400px] md:h-[600px]  bg-[rgba(0,0,0,0.7)] flex flex-col justify-center items-center'>
                    <h1 className='text-white text-3xl md:text-5xl m-2 '> About</h1>
                    <div className="h-1 w-[80px] md:w-[180px] mt-2 bg-white"></div>
                </div>
            </header>

            <div className='h-8'></div>


            <main className='w-10/12 flex flex-col-reverse md:flex-row mx-auto rounded-3xl'>
                {/* section 1 */}
                <div className='p-2 md:p-10 bg-slate-200 md:w-1/2 '>
                    <h1 className='text-3xl md:text-4xl font-semibold text-pink-500'>Zuhra Store</h1>
                    <p className='text-2xl '>Zahra store contains the finest and latest types of clothing, and you can contact us via email or phone
                        You can also browse the products and categories, choose the appropriate product, and add it to the shopping cart, and we will ship the products at the appropriate time.</p>
                    {/* <p className='text-2xl mt-6 '>description_website</p> */}
                    <button onClick={() => { navigate('/category') }} className='p-2 bg-pink-500 hover:bg-pink-400 duration-300 rounded-xl text-xl text-white mt-4'>Explore Category</button>
                </div>
                {/* end section 1 */}
                {/* section 2 */}
                <div className=' bg-slate-100 md:w-1/2 '>
                    <img src={phoneCall} alt='phone call' />
                </div>
                {/* end section 2 */}
            </main>

            <div className='h-8'></div>

        </div>
    )
}

export default BodyAbout