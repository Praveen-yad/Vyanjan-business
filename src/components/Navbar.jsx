import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    let token = localStorage.getItem('token')

    const LogoutHandler = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        navigate('/')
    }


    return (
    <div className=' bg-neutral-900 w-full h-[4.5rem] px-5 flex items-center justify-between shadow-[0px_3px_4px_0px] shadow-black sticky top-0 z-50'>
    <div className='flex space-x-8 items-center relative'>
        <img alt='' src='https://res.cloudinary.com/de2rges3m/image/upload/v1681306027/vyanjan-removebg-preview_ocfns3.png' className='w-52 -translate-x-4' onClick={() => navigate('/')} />
        {(location.pathname !== '/items') && <div className='text-neutral-300 pt-1 cursor-pointer -translate-x-8 hidden sm:flex' onClick={() => navigate('/items')}>Menu</div>}
        {(location.pathname !== '/orders') && <div className='text-neutral-300 pt-1 cursor-pointer -translate-x-8 hidden sm:flex' onClick={() => navigate('/orders')}>Orders</div>}
    </div>
    <div className='bg-theme cursor-pointer text-white px-4 py-1 text-lg rounded-lg' onClick={LogoutHandler}>{token ? 'Logout' : 'Login'}</div>
    </div>
  )
}

export default Navbar
