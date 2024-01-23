import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <>
        <header className='bg-slate-200 p-3'>
            <nav className='max-w-screen-xl mx-auto flex justify-between items-center'>
            <Link to='/'>
            <div className="font-bold text-lg">Auth</div>
            </Link>
            <ul className='flex items-center gap-7'>
            <Link to='/'>
            <li className='font-semibold'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='font-semibold'>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? <img src={currentUser.profilePicture} alt="picture" className='w-9 h-9 rounded-full object-cover' /> : <li className='font-semibold'>Sign In</li> }
            
            </Link>  
            </ul>
            </nav>
        </header>
    </>
  )
}

export default Header