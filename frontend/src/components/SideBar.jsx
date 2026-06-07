import React, { useState } from 'react'
import { FiFileText, FiHeart, FiHome, FiLogOut, FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi"
import { NavLink, useNavigate } from 'react-router-dom'

const SideBar = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const arrayLink = [
        {
            name: "Dashboard",
            icon: <FiHome />,
            link: user?.role === "student" ? '/student/dashboard' : '/recruiter/dashboard'
        }, {
            name: "Browse Jobs",
            icon: <FiSearch />,
            link: '/student/browsejob'
        }, {
            name: "Applied Jobs",
            icon: <FiFileText />,
            link: '/student/appliedjob'
        }, {
            name: "Saved Jobs",
            icon: <FiHeart />,
            link: '/student/savedjob'
        }, {
            name: "Profile",
            icon: <FiUser />,
            link: '/student/profile'
        }
    ]

    return (
        <>
            {/* Hamburger - sirf small screen */}
            <button
                className='fixed top-3 left-3 z-50 block sm:hidden text-2xl bg-background rounded-xl p-2 shadow text-text-primary'
                onClick={() => setShow(!show)}
            >
                {show ? <FiX /> : <FiMenu />}
            </button>

            {/* Overlay */}
            {show && (
                <div
                    className='fixed inset-0 z-30 bg-black/40 sm:hidden'
                    onClick={() => setShow(false)}
                />
            )}

            {/* Sidebar */}
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

export default SideBar