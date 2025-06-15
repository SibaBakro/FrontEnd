import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material'
import { pink } from '@mui/material/colors';

const BodyFavoirte = () => {
  const [product, setProduct] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [category, setCategory] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(true)
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  useEffect(() => {
    // @ts-ignore
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/favorite/index`, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
      },
    })
      .then((response) => {
        // console.log(response.data.product)
        setProduct(response.data.product)
        setLoadingProduct(false)
      })

  }, [count])

  const handleDestroyToFavorite = (id) => {
    // alert(id); return ;
    if (window.confirm("Are you sure you want to delete this product from favorite ?")) {
      const data = []
      // @ts-ignore
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/favorite/destroy/${id}`, {
        headers: {
          'Accept': "application/json",
          Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
        },
      }).then((response) => {
        alert('deleted from Favorites')
      }).catch((error) => {
        alert('Error')
      })
      setCount(x => x + 1)
    }
  }
  return (
    <div className=''>
      <main className='bg-slate-50 w-10/12 mx-auto '>

        <div className="flex flex-col justify-center items-center">
          <h1 className="mt-4 text-2xl md:text-5xl text-black uppercase font-bold">Favorite</h1>
          <p className='mt-4 text-black text-xl'> You can browse all our products in Favorite and add any product you want to your shopping cart </p>
        </div>
    
        {product.length == 0 ? <div className='space-y-1 rounded-2xl m-6 h-36  w-full'>
          <h1 className='text-xl text-center text-green-500'>No products added to favorites</h1>
        </div> : null}
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
                  <button onClick={() => { handleDestroyToFavorite(item.favorite_id) }}
                    className="bg-pink-500   rounded-lg hover:bg-pink-400 px-10 py-1 duration-300 text-center font-medium text-xl mt-4 text-white">Delete from Favorite</button>
                </div>
              </div>
            ))}
        </div>
      </main >
    </div>
  )
}

export default BodyFavoirte