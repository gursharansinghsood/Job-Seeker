// components/RecruiterSideBar.jsx
import React, { useState } from 'react'
import { FiHome, FiPlusSquare, FiFileText, FiLogOut, FiMenu, FiX, FiUsers } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom'

const RecruiterSideBar = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const arrayLink = [
        { name: "Dashboard", icon: <FiHome />, link: '/recruiter/dashboard' },
        { name: "Post a Job", icon: <FiPlusSquare />, link: '/recruiter/postjob' },
        { name: "My Jobs", icon: <FiFileText />, link: '/recruiter/myjobs' },
        { name: "Applications", icon: <FiUsers />, link: '/recruiter/applications' },
    ]

    return (
        <>
            <button
                className='fixed top-3 left-3 z-50 block sm:hidden text-2xl bg-background rounded-xl p-2 shadow text-text-primary'
                onClick={() => setShow(!show)}
            >
                {show ? <FiX /> : <FiMenu />}
            </button>

            {show && (
                <div className='fixed inset-0 z-30 bg-black/40 sm:hidden' onClick={() => setShow(false)} />
            )}

            <div className={`
                fixed sm:sticky top-0 left-0 z-40
                h-screen w-56 flex-shrink-0
                bg-background text-text-primary
                flex flex-col p-1
                border-r border-border
                transform transition-all duration-300 ease-in-out
                ${show ? 'translate-x-0' : '-translate-x-full'}
                sm:translate-x-0
            `}>
                <div className='flex flex-col gap-1 mt-12 sm:mt-0'>
                    {arrayLink.map((item, idx) => (
                        <NavLink
                            to={item.link}
                            key={idx}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-6 py-3 rounded-md text-sm transition-all duration-300 ease-in-out hover:bg-secondary ${isActive ? 'bg-secondary' : 'bg-background'}`
                            }
                            onClick={() => setShow(false)}
                        >
                            {item.icon}
                            <p>{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                <hr className='mx-4 text-secondary my-1' />

                <div
                    className='flex items-center gap-3 px-6 py-3 rounded-md text-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-secondary'
                    onClick={() => {
                        localStorage.removeItem("user")
                        localStorage.removeItem("token")
                        navigate("/")
                        setShow(false)
                    }}
                >
                    <FiLogOut />
                    <p>Logout</p>
                </div>
            </div>
        </>
    )
}

export default RecruiterSideBar