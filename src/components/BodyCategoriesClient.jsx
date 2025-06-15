import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material'
import { pink } from '@mui/material/colors';

const BodyCategories = () => {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const theme = useTheme();
    const [loadingCategory, setLoadingCategory] = useState(true)
    const [loadingProduct, setLoadingProduct] = useState(true)

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/getProductById/${id}`, {
            headers: {
                'Accept': "application/json",
                'lang': localStorage.getItem('currentLang'),
            },
        })
            .then((response) => {
                // console.log(response.data.product)
                setProduct(response.data.product)
                setLoadingProduct(false)
            })

        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/category/show/${id}`, {
            headers: {
                'Accept': "application/json",
                'lang': localStorage.getItem('currentLang'),
            },
        })
            .then((response) => {
                // console.log(response, 'categoryName')
                setCategoryName(response.data.category)
            })
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/category/index`, {
            headers: {
                'Accept': "application/json",
                'lang': localStorage.getItem('currentLang'),
            },
        })
            .then((response) => {
                // console.log(response.data.category, 'category')
                setCategory(response.data.category)
                setLoadingCategory(false)
            })
    }, [id])

    const handleChooseCategory = (idItem) => {
        if (idItem != id) {
            setLoadingCategory(true)
            setLoadingProduct(true)
            navigate(`/category/${idItem}`);
            // setCount(x => x + 1);
        }
    }
    const handleAddToFavorite = (id) => {
        // alert(id)
        if (window.confirm("Are you sure you want to add this product to favvorite ?")) {
            const data = []
            // @ts-ignore
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/favorite/store/${ id }`, data, {
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
                },
            }).then((response) => {
                alert('Added to Favorites')
            }).catch((error)=>{
                alert('This product cannot be added twice to favorites')
            })
        }
    }
    return (
        <div className=''>
            <main className='bg-slate-50 w-10/12 mx-auto '>

                <div className="flex flex-col justify-center items-center">
                    <h1 className="mt-4 text-2xl md:text-5xl text-black uppercase font-bold">products</h1>
                    <p className='mt-4 text-black text-xl'> You can browse all our products and add any product you want to your shopping cart </p>
                </div>


                <div className='p-4'>
                    <h1 className='text-2xl font-bold'>{categoryName.
                        // @ts-ignore
                        category_name}</h1>
                    <div className='flex overflow-auto'>
                        {loadingCategory ? <CircularProgress sx={{ color: pink[600] }} />
                            :
                            category.map((item, index) => (
                                <button key={index} onClick={() => { handleChooseCategory(item.id) }}   >
                                    <h1 className='bg-slate-300 rounded-lg p-2 m-2 text-lg'>{item.category_name}</h1>
                                </button>
                            ))}

                    </div>
                </div>

                <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                    {loadingProduct ? <CircularProgress sx={{ color: pink[600] }} /> :
                        product.map((item, index) => (

                            <div key={index} className='space-y-1 rounded-2xl m-2 shadow-2xl border w-10/12 sm:w-[340px]'>
                                <img src={
                                    // @ts-ignore
                                    import.meta.env.VITE_BACKEND_URL + "/" + item.product_image1} alt='' className='w-full h-[160px] rounded-t-2xl' />
                                <h1 className='text-2xl font-medium  p-2'>{item.product_title}</h1>
                                <p className='text-xl text-slate-500 p-2'>{item.product_desc}</p>
                                <div className='p-2 flex flex-col sm:flex-row'>
                                    <div>
                                        <h3 className='text-xl'>{item.product_price}$</h3>
                                        {
                                            item.product_discount == 0 ? null :
                                                <h3 className='text-xl'>Discount : {item.product_discount}</h3>
                                        }
                                    </div>
                                </div>

                                <div className='p-4'>
                                    <Link to={`/detailsProduct/` + item.id}
                                        className="bg-pink-500   rounded-lg hover:bg-pink-400 px-10 py-1 duration-300 text-center font-medium text-xl mt-4 text-white">show</Link>
                                    <button onClick={() => { handleAddToFavorite(item.id) }}
                                        className="bg-pink-500   rounded-lg hover:bg-pink-400 px-10 py-1 duration-300 text-center font-medium text-xl mt-4 text-white">Add to Favorite</button>
                                </div>
                            </div>
                        ))}

                </div>



                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-y-4 my-10 px-4 rounded-xl">
                {product.map((item, index) => (
                    <div key={index} className="flex flex-col relative overflow-hidden items-center space-y-2 rounded-md py-4 px-2 border w-[300px] bg-slate-300">
                        <img src={
                            // @ts-ignore
                            import.meta.env.VITE_BACKEND_URL + "/" + item.product_image1} className="rounded-xl w-[290px] h-[240px]" alt="" />
                        <h1 className="text-3xl font-bold flex ">{item.product_title}</h1>
                        <p className="text-xl h-[100px]">{t('price')} :{item.product_price}$</p>

                        <div className="flex space-x-2 p-4">
                            <Link to={`/detailsProduct/` + item.id}
                                className="bg-blue-500 rounded-lg absolute bottom-4 left-4 hover:bg-blue-400 px-2 py-1 duration-300 font-bold text-xl text-white text-center w-[260px]">{t('show')}</Link>
                            <a href="#"
                                className="bg-red-500 rounded-lg hover:bg-red-400 px-2 py-1 duration-300 font-medium text-lg">Add to
                                Cart</a>
                        </div>
                    </div>
                ))}
            </div> */}



            </main >
        </div>
    )
}

export default BodyCategories