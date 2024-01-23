import React, { useState } from 'react'
import signup from "../assets/signup-image.jpg"
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
const SignUp = () => {
  const [formData, setFromData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setLoading(false)
      if (data.success === false) {
         setError(true)
         return
      }
      navigate("/sign-in")
    } catch (error) {
      setLoading(false)
      setError(true)
    }

  }
  return (
    <>
      <div className="w-full hscreen flex items-center justify-center color">
        <div className="flex h-full items-center justify-center width mx-auto py-20 shadow rounded-3xl mdflex bg-white">

          <form onSubmit={handleSubmit} className="w-full mx-20 md:mx-10 pl-8 form1">
            <h1 className='text-4xl font-bold mb-8'>Sign Up</h1>
            <div className="relative w-full mb-6">
              <input type="text" placeholder="Username" className='inpwidth borders  py6' id='username' onChange={handleChange} />
              <label htmlFor="name" className='absolute top left-0 z-10'><i className='bx bxs-user'></i></label>

            </div>
            <div className="relative w-full mb-6">
              <input type="email" placeholder="Email" className='inpwidth borders  py6' id='email' onChange={handleChange} />
              <label htmlFor="name" className='absolute top left-0 z-10'><i className='bx bxs-envelope' ></i></label>
            </div>
            <div className="relative w-full mb-6">
              <input type="password" placeholder="Password" className='inpwidth borders  py6 ' id='password' onChange={handleChange} />
              <label htmlFor="name" className='absolute top left-0 z-10'><i className='bx bxs-lock-alt'></i></label>
            </div>
            {/* <div className="relative w-full mb-6">
              <input type="password" placeholder="Repeat your Password" className='inpwidth borders  py6 ' id='confirmPassword' onChange={handleChange} />
              <label htmlFor="name" className='absolute top left-0 z-10'><i className='bx bx-lock-alt' ></i></label>
            </div> */}

            {/* <div className="field mb-3" >
              <input type="checkbox" name="" id="" />
              <span className='text-sm ml-2'> I agree all statements in Term of services</span>
            </div> */}
            <button disabled={loading} className='btn'>{loading ? "Loading...": "Sign Up"}</button>

            <p className="text-red-700 mt-2">{error && "Something went wrong"}</p>
            <OAuth />
          </form>
          
          <div className="w-full object-cover  px-14 obj">
            <img src={signup} alt="signup_image" className='pb-20 pb20' />
            <Link to="/sign-in">
              <div className='text-center underline pb11'>I am already member</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp