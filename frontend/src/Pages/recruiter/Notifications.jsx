// Pages/recruiter/Notifications.jsx
import React from 'react'
import RecruiterNavBar from '../../components/RecruiterNavBar'
import RecruiterSideBar from '../../components/RecruiterSideBar'
import Footer from '../../components/Footer'
import useAxios from '../../service/CustomHook'
import { API } from '../../service/api'
import { FiBell, FiTrash2, FiCheck, FiBriefcase, FiUser, FiActivity } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const typeConfig = {
    application_received: { icon: <FiActivity />, color: 'text-primary-hover bg-primary/10' },
    application_shortlisted: { icon: <FiBriefcase />, color: 'text-success bg-success/10' },
    application_rejected: { icon: <FiUser />, color: 'text-warning bg-warning/10' },
    new_application: { icon: <FiActivity />, color: 'text-danger bg-danger/10' },
}

const Notifications = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const { data, loading, refetch } = useAxios(`/notifications/${user?._id}`)

    const notifications = data?.notifications || []
    const unread = notifications.filter(n => !n.read).length

    const handleRead = async (id) => {
        await API.put(`/notifications/read/${id}`)
        refetch()
    }

    const handleReadAll = async () => {
        await API.put(`/notifications/readall/${user?._id}`)
        refetch()
    }

    const handleDelete = async (id) => {
        await API.delete(`/notifications/delete/${id}`)
        refetch()
    }

    const handleClearAll = async () => {
        await API.delete(`/notifications/clear/${user?._id}`)
        refetch()
    }

    const timeAgo = (date) => {
        const diff = Date.now() - new Date(date).getTime()
        const mins = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)
        if (mins < 1) return 'Just now'
        if (mins < 60) return `${mins}m ago`
        if (hours < 24) return `${hours}h ago`
        return `${days}d ago`
    }

    return (
        <div className='flex flex-col w-full min-h-screen bg-surface text-text-primary'>

            {loading && (
                <div className='fixed inset-0 z-50 bg-black/40 flex justify-center items-center'>
                    <div className='border-4 w-10 h-10 border-white border-t-transparent animate-spin rounded-full' />
                </div>
            )}

            <RecruiterNavBar />

            <div className='flex flex-1'>
                <RecruiterSideBar />

                <div className='flex-1 p-5 sm:p-10'>

                    {/* Header */}
                    <div className='flex items-center justify-between mb-6'>
                        <div>
                            <p className='text-2xl font-semibold'>Notifications</p>
                            <p className='text-sm text-text-secondary mt-1'>
                                {unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up!'}
                            </p>
                        </div>

                        {notifications.length > 0 && (
                            <div className='flex gap-2'>
                                {unread > 0 && (
                                    <button
                                        onClick={handleReadAll}
                                        className='flex items-center gap-1 text-xs border border-border px-3 py-1.5 rounded-xl hover:bg-secondary transition-all duration-200 cursor-pointer'
                                    >
                                        <FiCheck /> Mark all read
                                    </button>
                                )}
                                <button
                                    onClick={handleClearAll}
                                    className='flex items-center gap-1 text-xs border border-danger text-danger px-3 py-1.5 rounded-xl hover:bg-danger/10 transition-all duration-200 cursor-pointer'
                                >
                                    <FiTrash2 /> Clear all
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className='flex flex-col gap-3'>
                        {notifications.length > 0 ? (
                            notifications.map((notif, idx) => {
                                const config = typeConfig[notif.type] || typeConfig.new_application

                                return (
                                    <div
                                        key={idx}
                                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200
                                            ${notif.read
                                                ? 'bg-background border-border opacity-70'
                                                : 'bg-background border-primary-hover'
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-sm ${config.color}`}>
                                            {config.icon}
                                        </div>

                                        {/* Content */}
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-start justify-between gap-2'>
                                                <p className={`text-sm font-medium ${!notif.read ? 'text-text-primary' : 'text-text-secondary'}`}>
                                                    {notif.title}
                                                </p>
                                                <span className='text-xs text-text-secondary whitespace-nowrap flex-shrink-0'>
                                                    {timeAgo(notif.createdAt)}
                                                </span>
                                            </div>
                                            <p className='text-xs text-text-secondary mt-0.5'>{notif.message}</p>

                                            {/* Actions */}
                                            <div className='flex gap-3 mt-2'>
                                                {notif.postId && (
                                                    <Link
                                                        to={`/recruiter/applications/${notif.postId}`}
                                                        className='text-xs text-primary-hover hover:underline'
                                                    >
                                                        View Applications
                                                    </Link>
                                                )}
                                                {!notif.read && (
                                                    <button
                                                        onClick={() => handleRead(notif._id)}
                                                        className='text-xs text-text-secondary hover:text-text-primary cursor-pointer'
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(notif._id)}
                                                    className='text-xs text-danger hover:underline cursor-pointer'
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {/* Unread dot */}
                                        {!notif.read && (
                                            <div className='flex-shrink-0 w-2 h-2 rounded-full bg-primary-hover mt-1' />
                                        )}
                                    </div>
                                )
                            })
                        ) : (
                            !loading && (
                                <div className='flex flex-col items-center justify-center mt-20 gap-3'>
                                    <FiBell className='text-5xl text-text-secondary' />
                                    <p className='text-text-secondary text-sm'>No notifications yet.</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Notifications
