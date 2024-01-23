import React, { useState } from 'react'
import signin from "../assets/signin-image.jpg"
import { Link,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
const SignIn = () => {
  const [formData, setFromData] = useState([])
  const navigate = useNavigate()
  const {loading, error} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // setLoading(true)
      // setError(false)
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      // setLoading(false)

      if (data.success === false) {
        dispatch(signInFailure(data))
         return
      }
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (error) {
      // setLoading(false)
      // setError(true)
      dispatch(signInFailure(error))
    }

  }
  return (
    <>
      <div className="w-full hscreensignin flex items-center justify-center color">
        <div className="flex items-center justify-center width mx-auto py-20 shadow rounded-3xl bg-white mdflex">
        <div className="w-full object-cover pt110">
        <img src={signin} alt="signup_image" className='pb-12 pb20'  />
        <Link to="/sign-up">
        <div className='text-center underline'>Create an account</div>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="w-full mx-20 pl-8 md:pl-0 md:mx-0 pr-24 form ">
        <h1 className='text-4xl font-bold mb-8'>Sign In</h1>
        <div className="relative w-full mb-6">
        <input type="email" placeholder="Email" className='inpwidth borders  py6' id='email' onChange={handleChange} />
          <label htmlFor="email" className='absolute top left-0 z-10'><i className='bx bxs-user'></i></label>
        </div>
        <div className="relative w-full mb-6">
        <input type="password" placeholder="Password" className='inpwidth borders py6' id='password' onChange={handleChange} />
          <label htmlFor="password" className='absolute top left-0 z-10'><i className='bx bxs-lock-alt'></i></label>
        </div>
           
           <div className="field mb-10">
            <input type="checkbox" name="" id="" />
            <span className='text-sm ml-2'> Remember me</span>
           </div>

           <button className='btn'>{loading ? "Loading...": "Sign In"}</button>
           <p className="text-red-700 mt-20 p text-sm">{error ? error.message || "Something went wrong":""}</p>
           <OAuth />
      </form>
        </div>
      </div>
    </>
  )
}

export default SignIn