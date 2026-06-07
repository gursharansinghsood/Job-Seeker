import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { API } from '../../service/api'
import { MdAccountCircle } from 'react-icons/md'

const Login = () => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState({ text: '', type: '' })

    const navigate = useNavigate()

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm()

    useEffect(() => {
        setFocus("username")
    }, [])

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setFeedback({ text: '', type: '' })

            const response = await API.post("/user/login", data)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
            }

            setFeedback({ text: "Login Successful", type: "success" })

            setTimeout(() => {
                navigate(
                    response.data.user.role === "student"
                        ? "/student/dashboard"
                        : "/recruiter/dashboard"
                )
            }, 1000)

        } catch (error) {
            setLoading(false)
            setFeedback({
                text: error.response?.data?.message || "Login Failed",
                type: "error"
            })
        }
    }

    const inputDiv = (hasError) =>
        `flex items-center border rounded-md py-2 px-3 gap-2 transition-colors duration-200
        ${hasError ? 'border-danger' : 'border-text-secondary focus-within:border-primary-hover'}
        ${loading ? 'cursor-not-allowed opacity-60' : 'cursor-text'}`

    const errorClass = 'text-danger text-xs absolute bottom-0 left-0'
    const labelClass = 'text-xs font-medium mb-1 block'
    const sectionClass = 'pb-5 relative'
    const inputClass = 'outline-none flex-1 text-sm bg-transparent disabled:cursor-not-allowed'

    return (
        <div className='h-screen w-full flex justify-center items-center bg-surface'>

            {loading && (
                <div className='fixed inset-0 z-50 bg-black/40 flex justify-center items-center'>
                    <div className='border-4 w-10 h-10 border-white border-t-transparent animate-spin rounded-full' />
                </div>
            )}

            <div className='max-w-md w-full bg-background text-text-primary p-6 sm:p-8 flex flex-col rounded-2xl shadow-lg m-5'>

                <p className='text-xl sm:text-2xl font-semibold mb-1 text-center'>Welcome Back 👋</p>
                <p className='text-xs sm:text-sm text-text-secondary mb-6 text-center'>
                    Login into your account and continue
                </p>

                <form className='w-full pb-7 relative' onSubmit={handleSubmit(onSubmit)}>

                    <div className={sectionClass}>
                        <label className={labelClass}>Username</label>
                        <div className={inputDiv(errors.username)}>
                            <MdAccountCircle className='text-text-secondary text-lg flex-shrink-0' />
                            <input
                                type="text"
                                className={inputClass}
                                disabled={loading}
                                placeholder='Enter your username'
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        setFocus("password")
                                    }
                                }}
                                {...register("username", { required: "Username is required" })}
                            />
                        </div>
                        {errors.username && <p className={errorClass}>{errors.username.message}</p>}
                    </div>

                    <div className={sectionClass}>
                        <label className={labelClass}>Password</label>
                        <div className={inputDiv(errors.password)}>
                            <FiLock className='text-text-secondary flex-shrink-0' />
                            <input
                                type={show ? 'text' : 'password'}
                                className={inputClass}
                                disabled={loading}
                                placeholder='Enter your password'
                                {...register("password", { required: "Password is required" })}
                            />
                            <button
                                type='button'
                                onClick={() => setShow(!show)}
                                className='text-text-secondary hover:text-text-primary transition-colors cursor-pointer'
                            >
                                {show ? <FiEye /> : <FiEyeOff />}
                            </button>
                        </div>
                        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-primary hover:bg-primary/80 w-full py-2.5 rounded-lg text-sm font-medium mt-1 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {feedback.text && (
                        <p className={`text-xs text-center absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap
                            ${feedback.type === "success" ? 'text-success' : 'text-danger'}`}>
                            {feedback.text}
                        </p>
                    )}
                </form>

                <p className='text-xs sm:text-sm text-text-secondary text-center'>
                    Don't have an account?{' '}
                    <Link to="/signup" className='text-primary-hover font-medium hover:underline'>
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login