import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import google from "../assets/google.png"
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,
                })
              })
              const data = await res.json()
              dispatch(signInSuccess(data))
              navigate("/")
        } catch (error) {
            console.log("Could not login with Google", error);
        }
    }
    return (
        <>
            <div className="soical-login mt16 flex  items-center oauth">
                <span>Or login with </span>
                <div className="w-10 googleborder p-1 ml-3 cursor-pointer" onClick={handleGoogleClick}>
                    <img src={google} alt="google_logo" className='w-full ' />
                </div>
            </div>
        </>
    )
}

export default OAuth