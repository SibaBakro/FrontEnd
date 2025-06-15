import React, { useState, useEffect } from 'react'
import BodyProfile from '../components/BodyProfile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ProfileClient = () => {
    document.title = "E-commerce Profile"
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('zuhra_token') == null) {
            navigate('/signIn')
        }
    }, [])
    return (
        <>
            <BodyProfile />
        </>
    )
}

export default ProfileClient