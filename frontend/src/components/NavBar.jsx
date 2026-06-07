import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBell, FiSearch } from 'react-icons/fi'
import { MdAccountCircle, MdBusinessCenter } from 'react-icons/md'
import { API } from '../service/api'

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        const fetchUnread = async () => {
            try {
                const res = await API.get(`/notifications/unread/${user?._id}`)
                setUnreadCount(res.data.count)
            } catch (error) {
                console.error(error)
            }
        }
        if (user?._id) fetchUnread()
    }, [])

    return (
        <div className='sticky top-0 z-50 flex justify-between w-full items-center bg-background h-16 text-text-primary border-b border-border shadow-sm'>
            <div className='flex items-center gap-3 text-lg sm:text-2xl font-bold pl-14 sm:pl-5'>
                <MdBusinessCenter />
                <span>JobSeeker</span>
            </div>

            <div className='flex items-center gap-5 sm:gap-8 px-5 text-xl sm:text-2xl'>
                <Link to='/student/browsejob'><FiSearch /></Link>

                <Link to='/student/notifications' className='relative'>
                    <FiBell />
                    {unreadCount > 0 && (
                        <span className='absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[10px] flex items-center justify-center rounded-full'>
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Link>

                <Link to='/student/profile' className='text-2xl sm:text-3xl'>
                    <MdAccountCircle />
                </Link>
            </div>
        </div>
    )
}

export default NavBar