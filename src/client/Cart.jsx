import React, { useState, useEffect } from 'react'
import BodyCart from '../components/BodyCart'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Cart = () => {
    document.title = "E-commerce cart"
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('zuhra_token') == null) {
            navigate('/signIn')
        }
    }, [])
    return (
        <>
            <BodyCart />
        </>
    )
}

export default Cart