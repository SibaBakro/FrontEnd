import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material';
import { pink } from '@mui/material/colors';

const BodyCategory = () => {
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState()
    const theme = useTheme();


    const categoryIndex = () => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/category/index`, {
            headers: {
                'Accept': "application/json",
            },
        })
            .then((response) => {
                console.log(response.data.category)
                setCategory(response.data.category)
                setLoading(false)
            })
    }
    useEffect(() => {
        // if (searchText == null) {
        categoryIndex();
        // }
    }, [])

    const handleSearch = () => {
        if (searchText == null) {
            categoryIndex(); alert('null')
        } else {
            const data = {
                searchText: searchText
            }
            // @ts-ignore
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/category/search`, data, {
                headers: {
                    'Accept': "application/json",
                    'lang': localStorage.getItem('currentLang'),
                },
            })
                .then((response) => {
                    // console.log(response.data.category)
                    setCategory(response.data.category)
                })
        }
    }
    return (
        <div className=''>
            <main className='bg-slate-50 w-10/12 mx-auto'>

                <div className="flex flex-col justify-center items-center">
                    <h1 className="mt-4 text-2xl md:text-5xl text-black uppercase font-bold">categories</h1>
                    <p className='mt-4 text-black text-xl'> We have the most luxurious and finest clothes </p>
                </div>


                {/* <div className='flex justify-center m-2'>
                <input type='text' onChange={(e) => setSearchText(
                    // @ts-ignore
                    e.target.value)} name='' placeholder={t('search')} className='m-2 p-2 border-2 border-black rounded-lg' />
                <button onClick={handleSearch} className='bg-blue-500 hover:bg-blue-400 duration-300 p-2   rounded-lg font-bold text-xl text-white'>{t('search')}</button>
            </div> */}

                <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                    {loading ? <CircularProgress sx={{ color: pink[600] }} /> :
                        category.map((item, index) => (

                            <div key={index} className='space-y-1 rounded-2xl m-2 shadow-2xl border w-10/12 sm:w-[340px] '>
                                <img src={
                                    // @ts-ignore
                                    import.meta.env.VITE_BACKEND_URL + "/" + item.category_image} alt='' className='w-full h-[160px] rounded-t-2xl' />
                                <h1 className='text-2xl font-medium p-2 '>{item.category_name}</h1>
                                <p className='text-xl text-slate-500 p-2'>{item.category_disc}</p>
                                {/* <div className='flex p-2'>
                        <h3 className='text-xl'>23$</h3>
                        <h3 className='mx-16 text-yellow-400 text-xl'> <StarIcon /> <StarIcon /></h3>
                    </div> */}

                                <div className='p-4'>
                                    <Link to={`/category/` + item.id}
                                        className="bg-pink-500 rounded-lg  hover:bg-pink-400 px-10 py-1 duration-300 text-center font-medium text-xl mt-4 text-white">show</Link>
                                </div>
                            </div>
                        ))}

                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-y-4 my-10 px-4 rounded-xl">
                {category.map((item, index) => (

                    <div key={index} className="flex flex-col items-center space-y-2 rounded-md py-4 px-2 border w-[300px] bg-slate-300">
                        <img src={
                            // @ts-ignore
                            import.meta.env.VITE_BACKEND_URL + "/" + item.category_image} className="rounded-xl w-[290px] h-[240px]" alt="" />
                        <h1 className="text-3xl font-bold">{item.category_name}</h1>
                        <p className="text-xl h-[100px]">{item.category_disc}</p>

                        <div className="flex space-x-2 p-4">
                            <Link to={`/product/` + item.id}
                                className="bg-blue-500  rounded-lg hover:bg-blue-400 px-2 py-1 duration-300 text-center font-bold text-xl text-white w-[260px]">{t('show')}</Link>
                        </div>
                    </div>

                ))}

            </div> */}


            </main>
        </div>
    )
}

export default BodyCategory