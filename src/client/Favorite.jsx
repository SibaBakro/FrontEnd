import React, { useState, useEffect } from 'react'
import BodyFavoirte from '../components/BodyFavoirte'
import { useNavigate } from 'react-router-dom'
const Favorite = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('zuhra_token') == null) {
            navigate('/signIn')
        }
    }, [])
    return (
        <>
            <BodyFavoirte />
        </>
    )
}

export default Favorite