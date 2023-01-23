import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
    const navigate = useNavigate();
    return (
        /*  <div onClick={() => navigate("/")} className='logo'>
             <img src={process.env.REACT_APP_API_URL + "logo.png"} />
         </div> */
        <div className='logo-readme-header'>
            <span>TRAVEL</span>
        </div>
    )
}

export default Logo