import React from 'react'
import './NotFound.css'
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()

    const goToHome = (e) => {
        if (e.ctrlKey || e.metaKey) {
            window.open("/")
        } else {
            navigate('/')
        }
    }

    return (
        <>
        <div className='notFoundContainer'>
            <div className='notFoundSection'>
                <h1>404</h1>
                <h2>Search not found</h2>
            </div>
            <div className='goToHome' onClick={(e)=>goToHome(e)}>
                <div className='notFoundIcon'><AiOutlineHome size={20}/></div>
                Go to Homepage
            </div>
        </div>
        </>
    )
}

export default NotFound