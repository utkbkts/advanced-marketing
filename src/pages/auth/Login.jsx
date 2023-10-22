import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, reset } from '../../redux/AuthSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user,isLoading,Message,isSuccess,isError}=useSelector((state)=>state.auth)
  const handleSubmit = (e) => {
    e.preventDefault()

    const userdata={
      email,
      password
    }
    dispatch(login(userdata))
  }
  useEffect(()=>{

    if(isError){
      message.error("Login failed ")
    }

    if(isSuccess || user){
      navigate("/")
    }
    if(isLoading === false){
      dispatch(reset())
    }
  },[user,isLoading,isError,isSuccess,message,navigate,dispatch])
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-[400px] h-[400px] bg-gray-700 rounded-sm shadow-md shadow-black'>
        <h3 className='text-white font-bold text-center p-4 tracking-wider'>Login</h3>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4 '>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="text" placeholder='email' className='p-2 rounded-sm placeholder:text-gray-400 outline-none' />
            <input  value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" placeholder='password' className='p-2 rounded-sm placeholder:text-gray-400 outline-none' />
            <button type='submit' className='bg-yellow-400 text-black py-2 w-full rounded-sm'>Login</button>
            <div>
                <span className='text-white'>Don't have an account ? <Link className='text-yellow-400 hover:text-yellow-600' to={"/signup"}>Signup</Link></span>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
