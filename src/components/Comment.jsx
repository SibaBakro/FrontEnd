import React, { useState, useEffect } from 'react'

import axios from 'axios'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const Comment = ({ id }) => {

    const [count, setCount] = useState(0)
    const [evaluation, setEvaluation] = useState([])
    const [user_comment_id, setUser_comment_id] = useState([])
    const [value, setValue] = React.useState(2);
    const [comment_name, setComment_name] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/evaluation/index/${id}`, {
            headers: {
                'Accept': "application/json",
            },
        })
            .then((response) => {
                console.log(response.data.evaluation)
                setEvaluation(response.data.evaluation)
            })
    }, [count])
    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        })
            .then((response) => {
                console.log(response.data.user.id, 'user')
                setUser_comment_id(response.data.user.id)
            })
    }, [])
    const handleSubmit = () => {
        // e.preventDefault();

        // @ts-ignore
        const data = {
            evaluation_comment: comment_name,
            evaluation_value: value,
        }
        // alert(comment_name + '  ' + value+',id='+id)
        // @ts-ignore
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/evaluation/store/${id}`, data, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            // console.log(response.data.message, 'comment')
            setCount(x => x + 1)
            alert(response.data.message)
        }).catch((error) => {
            console.error(error);
            alert(error.response.data.message)

        })
    }

    const handleDeteleRow = (comment_id) => {

        if (window.confirm("Are you sure you want to delete it ?")) {
            // @ts-ignore
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/evaluation/destroy/${comment_id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
                },
            }).then((response) => {
                console.log(response.data.message, 'comment')
                setCount(x => x + 1)
                alert(response.data.message)
            }).catch((error) => {
                console.error(error);
                alert(error.response.data.message)
            })
        }
    }

    return (
        <main className='mt-6'>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col md:flex-row md:m-4'>
                    <input type='text' placeholder='write any thing' className='px-2 border-2 border-black w-[240px] md:w-[400px] text-xl rounded-2xl'
                        onChange={(e) => setComment_name(
                            // @ts-ignore
                            e.target.value)} />
                    <button type='submit' className='bg-pink-500 text-xl hover:bg-pink-400 duration-300 text-white p-2 rounded-xl m-2'>comment</button>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Typography component="legend" className=''>product evaluation</Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            className=''
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Box>
                </form>
            </div>
            {/* comment */}

            <div className='p-2 flex-col mt-6'>
                <p className='text-3xl text-green-600'>comments :</p>
                {evaluation.map((item, index) => (

                    <div className='flex'>
                        {/* <div className='m-2'>
                            <img src={
                                // @ts-ignore
                                import.meta.env.VITE_BACKEND_URL + "/" + item.user_profile_image} alt='profile' className='w-[60px] rounded-full  border-slate-500 border-2 ' />
                        </div> */}
                        <div className='m-2'>
                            <h1 className='text-xl'>{item.name}</h1>
                            <p className='text-slate-600 '>{item.evaluation_comment}</p>
                            <p>{item.evaluation_value == 5 ? <div className='text-yellow-300'><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div> : null}</p>
                            <p>{item.evaluation_value == 4 ? <div className='text-yellow-300'><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarBorderIcon /></div> : null}</p>
                            <p>{item.evaluation_value == 3 ? <div className='text-yellow-300'><StarIcon /><StarIcon /><StarIcon /><StarBorderIcon /><StarBorderIcon /></div> : null}</p>
                            <p>{item.evaluation_value == 2 ? <div className='text-yellow-300'><StarIcon /><StarIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></div> : null}</p>
                            <p>{item.evaluation_value == 1 ? <div className='text-yellow-300'><StarIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></div> : null}</p>
                            <p>{item.client_id == user_comment_id ?
                                <button onClick={() => handleDeteleRow(item.id)} className='p-2 m-2 bg-red-500 hover:bg-red-400 duration-300 rounded-lg text-xl text-white'>delete</button> : null}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* end comment */}
        </main>
    )
}

export default Comment