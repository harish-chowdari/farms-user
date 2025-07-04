// Navbar.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    
    return (
        <nav className="flex sticky top-0 w-full justify-between items-center bg-white h-[8.5vh] text-white p-4">
        <div className='flex h-[8.5vh] items-center gap-1 p-1 px-2 pl-0 '>
            {/* <img className='h-[5vh] overflow-hidden' src={logo} /> */}
            <p className='text-green-600 font-bold text-xl'>Logo</p>
        </div>
        </nav>
    )
}

export default Navbar
