import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Comment from './Comment';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { pink } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ShowProduct = () => {

    const theme = useTheme();

    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [product_price, setProduct_price] = useState()
    const [product_discount, setProduct_discount] = useState()
    const [product_name, setProduct_name] = useState()
    const [product_desc, setProduct_desc] = useState()
    const [select, setSelect] = useState()
    const [product_image1, setProduct_image1] = useState()
    const [product_image2, setProduct_image2] = useState()
    const [product_image3, setProduct_image3] = useState()
    const [product_image4, setProduct_image4] = useState()
    const [evaluation, setEvaluation] = useState()
    const [loadingProduct, setLoadingProduct] = useState(true)
    const [loadingAddToCart, setLoadingAddToCart] = useState(false)
    const navigate = useNavigate()

    document.title = "E-commerce " + product_name

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/show/${id}`, {
            headers: {
                'Accept': "application/json",
            },
        })
            .then((response) => {
                console.log(response.data.product[0])
                setProduct_price(response.data.product[0].product_price)
                setProduct_discount(response.data.product[0].product_discount)
                setProduct_name(response.data.product[0].product_name)
                setProduct_desc(response.data.product[0].product_desc)
                setSelect(response.data.product[0].product_image1)
                setProduct_image1(response.data.product[0].product_image1)
                setProduct_image2(response.data.product[0].product_image2)
                setProduct_image3(response.data.product[0].product_image3)
                setProduct_image4(response.data.product[0].product_image4)
                setEvaluation(response.data.sum)
                setLoadingProduct(false)
                // alert(tax.tax_percent)
            })
    }, [])
    const createCart = () => {
        setLoadingAddToCart(true);
        const data = {
            product_id: id,
            cart_quantity: quantity
        }
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/store`, data, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        })
            .then((response) => {
                console.log(response.data)
                setLoadingAddToCart(false)
                alert('done')
            }).catch((error) => {
                alert(error)
                setLoadingAddToCart(false)
            })
    }
    return (
        <div className=''>
            <main className='bg-slate-50 w-10/12 mx-auto '>
                <div className='flex flex-col md:flex-row'>
                    {/* section 1 */}
                    <div className='p-2 md:w-1/2'>
                        {
                            loadingProduct ? <CircularProgress sx={{ color: pink[600] }} />
                                : <>
                                    <img src={
                                        // @ts-ignore
                                        import.meta.env.VITE_BACKEND_URL + "/" + select} alt='product' className='w-[460px] rounded-lg' />
                                    <div className='flex m-4'>
                                        <img src={
                                            // @ts-ignore
                                            import.meta.env.VITE_BACKEND_URL + "/" + product_image1} alt='product' onClick={() => { setSelect(product_image1) }} className='w-[60px] h-[60px] rounded-full border-pink-500 border-2 m-2 cursor-pointer' />
                                        <img src={
                                            // @ts-ignore
                                            import.meta.env.VITE_BACKEND_URL + "/" + product_image2} alt='product' onClick={() => { setSelect(product_image2) }} className='w-[60px] h-[60px] rounded-full border-pink-500 border-2 m-2 cursor-pointer' />
                                        <img src={
                                            // @ts-ignore
                                            import.meta.env.VITE_BACKEND_URL + "/" + product_image3} alt='product' onClick={() => { setSelect(product_image3) }} className='w-[60px] h-[60px] rounded-full border-pink-500 border-2 m-2 cursor-pointer' />
                                    </div></>
                        }
                    </div>
                    {/* end section 1 */}
                    {/* section 2 */}
                    <div className='md:w-1/2'>
                        {
                            loadingProduct ? <CircularProgress sx={{ color: pink[600] }} />
                                :
                                <>
                                    <div className='p-2 flex-col md:flex-row mt-10'>
                                        <h1 className='text-3xl font-semibold text-wrap'> {product_name}</h1>
                                    </div>

                                    <div className='p-2 flex-col md:flex-row'>
                                        <h1 className='text-2xl text-wrap'> price {product_price} $ </h1>
                                        {
                                            product_discount == 0 ? null :
                                                <h3 className='text-xl'>Discount : {product_discount}</h3>
                                        }
                                        <div>
                                            <p>{evaluation == 5 ? <div className='text-yellow-300'><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div> : null}</p>
                                            <p>{evaluation == 4 ? <div className='text-yellow-300'><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarBorderIcon /></div> : null}</p>
                                            <p>{evaluation == 3 ? <div className='text-yellow-300'><StarIcon /><StarIcon /><StarIcon /><StarBorderIcon /><StarBorderIcon /></div> : null}</p>
                                            <p>{evaluation == 2 ? <div className='text-yellow-300'><StarIcon /><StarIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></div> : null}</p>
                                            <p>{evaluation == 1 ? <div className='text-yellow-300'><StarIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></div> : null}</p>
                                        </div>
                                    </div>

                                </>
                        }
                        {/* <div className='p-2 flex'>
                        <h1 className='text-2xl  font-bold'>{t('price')} </h1> <h1 className='text-2xl'>
                            {tax == null ? product_price
                                // @ts-ignore
                                : product_price + (product_price / tax.tax_percent)
                            } $</h1>
                    </div> */}


                        <div className='p-2 flex-col md:flex-row mt-10'>
                            <div>
                                <h1 className='text-2xl  font-bold '>quantity :</h1>
                            </div>
                            <div>
                                <select className='text-xl w-[100px] border-2 border-black' onChange={(e) => {
                                    setQuantity(
                                        // @ts-ignore
                                        e.target.value)
                                }}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </select>
                                <button className='bg-pink-500 text-xl hover:bg-pink-400 duration-300 p-2 rounded-xl m-2 text-white' onClick={createCart}>
                                    Add to Cart
                                    {loadingAddToCart ? <CircularProgress sx={{ color: pink[600] }} /> : null}
                                </button>
                            </div>
                        </div>


                    </div>
                    {/* end section 2 */}
                </div>

                <aside>
                    {
                        loadingProduct ? <CircularProgress sx={{ color: pink[600] }} /> :
                            <>
                                <div className='p-2 flex flex-col'>
                                    <h1 className='text-2xl font-bold'>Product Description</h1>
                                    <p className='text-xl mt-2 '> {product_desc}</p>
                                </div>
                            </>
                    }
                </aside>

                {
                    loadingProduct ? <CircularProgress sx={{ color: '#fff' }} /> :
                        <Comment id={id} />}
            </main>
        </div>
    )
}

export default ShowProduct