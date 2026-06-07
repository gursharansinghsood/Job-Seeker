import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { API } from '../../service/api'
import { MdAccountCircle, MdBusiness } from 'react-icons/md'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState({ text: '', type: '' })
    const [selectedRole, setSelectedRole] = useState('')

    const navigate = useNavigate()

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm()

    useEffect(() => {
        setFocus("name")
    }, [])

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setFeedback({ text: '', type: '' })

            await API.post("/user/signup", data)

            setFeedback({ text: "Sign up Successful! Redirecting...", type: "success" })

            setTimeout(() => navigate('/'), 1000)

        } catch (error) {
            setLoading(false)
            setFeedback({
                text: error.response?.data?.message || "Sign up Failed",
                type: "error"
            })
        }
    }

    const inputDiv = (hasError) =>
        `flex items-center border rounded-md py-2 px-3 gap-2 transition-colors duration-200
        ${hasError ? 'border-danger' : 'border-text-secondary focus-within:border-primary-hover'}
        ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-text'}`

    const errorClass = 'text-danger text-xs absolute bottom-0 left-0'
    const labelClass = 'text-xs font-medium mb-1 block'
    const sectionClass = 'pb-5 relative'
    const inputClass = 'outline-none flex-1 text-sm bg-transparent disabled:cursor-not-allowed'
    const iconClass = 'text-text-secondary flex-shrink-0'

    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-surface py-6'>

            {loading && (
                <div className='fixed inset-0 z-50 bg-black/40 flex justify-center items-center'>
                    <div className='border-4 w-10 h-10 border-white border-t-transparent animate-spin rounded-full' />
                </div>
            )}

            <div className='max-w-md w-full bg-background text-text-primary p-6 sm:p-8 flex flex-col rounded-2xl shadow-lg m-5'>

                <p className='text-xl sm:text-2xl font-semibold text-center mb-1'>
                    Welcome to JobSeeker 👋
                </p>
                <p className='text-xs sm:text-sm text-text-secondary text-center mb-6'>
                    Join us and find the perfect job
                </p>

                <form className='w-full pb-7 relative' onSubmit={handleSubmit(onSubmit)}>

                    <div className={sectionClass}>
                        <label className={labelClass}>Full Name</label>
                        <div className={inputDiv(errors.name)}>
                            <FiUser className={iconClass} />
                            <input
                                type="text"
                                className={inputClass}
                                disabled={loading}
                                placeholder='Enter your full name'
                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); setFocus("companyname") } }}
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: { value: 3, message: "Minimum 3 characters required" },
                                    maxLength: { value: 20, message: "Maximum 20 characters allowed" },
                                    pattern: { value: /^[A-Za-z ]+$/, message: "Only alphabets are allowed" }
                                })}
                            />
                        </div>
                        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                    </div>

                    <div className={sectionClass}>
                        <label className={labelClass}>Username</label>
                        <div className={inputDiv(errors.username)}>
                            <MdAccountCircle className={iconClass} />
                            <input
                                type="text"
                                className={inputClass}
                                disabled={loading}
                                placeholder='Enter your username'
                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); setFocus("password") } }}
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: { value: 4, message: "Minimum 4 characters required" },
                                    maxLength: { value: 15, message: "Maximum 15 characters allowed" },
                                    pattern: { value: /^[a-z0-9_]+$/, message: "Use lowercase, numbers or _" }
                                })}
                            />
                        </div>
                        {errors.username && <p className={errorClass}>{errors.username.message}</p>}
                    </div>

                    <div className={sectionClass}>
                        <label className={labelClass}>Password</label>
                        <div className={inputDiv(errors.password)}>
                            <FiLock className={iconClass} />
                            <input
                                type={show ? 'text' : 'password'}
                                className={inputClass}
                                disabled={loading}
                                placeholder='Enter your password'
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Min 8 characters required" },
                                    maxLength: { value: 20, message: "Max 20 characters allowed" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]+$/,
                                        message: "Use upper, lower, number & symbol"
                                    }
                                })}
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

                    {/* Role */}
                    <div className={sectionClass}>
                        <label className={labelClass}>Role</label>
                        <div className={inputDiv(errors.role)}>
                            <select
                                className='w-full outline-none bg-background text-sm disabled:cursor-not-allowed'
                                disabled={loading}
                                {...register("role", {
                                    required: "Role is required",
                                    onChange: (e) => setSelectedRole(e.target.value)
                                })}
                            >
                                <option value="">Select your role</option>
                                <option value="student">Job Seeker / Student</option>
                                <option value="recruiter">Recruiter</option>
                            </select>
                        </div>
                        {errors.role && <p className={errorClass}>{errors.role.message}</p>}
                    </div>

                    {/* Company Name - Only show for Recruiter */}
                    {selectedRole === 'recruiter' && (
                        <div className={sectionClass}>
                            <label className={labelClass}>Company Name</label>
                            <div className={inputDiv(errors.companyname)}>
                                <MdBusiness className={iconClass} />
                                <input
                                    type="text"
                                    className={inputClass}
                                    disabled={loading}
                                    placeholder='Enter your company name'
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); setFocus("username") } }}
                                    {...register("companyname", {
                                        required: "Company name is required for recruiter",
                                        minLength: { value: 3, message: "Minimum 3 characters required" },
                                        maxLength: { value: 20, message: "Maximum 20 characters allowed" },
                                        pattern: { value: /^[A-Za-z0-9 ]+$/, message: "Only alphabets and numbers allowed" }
                                    })}
                                />
                            </div>
                            {errors.companyname && <p className={errorClass}>{errors.companyname.message}</p>}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-primary hover:bg-primary/80 w-full py-2.5 rounded-lg text-sm font-medium mt-1 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70'
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    {/* Feedback */}
                    {feedback.text && (
                        <p className={`text-xs text-center absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap
                            ${feedback.type === "success" ? 'text-success' : 'text-danger'}`}>
                            {feedback.text}
                        </p>
                    )}
                </form>

                {/* Login Link */}
                <p className='text-xs sm:text-sm text-text-secondary text-center'>
                    Already have an account?{' '}
                    <Link to="/" className='text-primary-hover font-medium hover:underline'>Login</Link>
                </p>

            </div>
        </div>
    )
}

export default Signup