// Pages/recruiter/Profile.jsx
import React, { useState } from 'react'
import RecruiterNavBar from '../../components/RecruiterNavBar'
import RecruiterSideBar from '../../components/RecruiterSideBar'
import Footer from '../../components/Footer'
import { FiUser, FiEdit2, FiSave, FiX, FiBriefcase, FiMapPin, FiCalendar, FiMail, FiPhone } from 'react-icons/fi'
import { API } from '../../service/api'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const [editing, setEditing] = useState(false)
    const [activeTab, setActiveTab] = useState("info")
    const [feedback, setFeedback] = useState({ text: '', type: '' })

    const [form, setForm] = useState({
        name: user?.name || '',
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
        companyName: user?.companyName || '',
        companyDescription: user?.companyDescription || '',
        companyLocation: user?.companyLocation || '',
    })

    // Backend + localStorage update
    const handleSave = async () => {
        try {
            const response = await API.put(`/user/update/${user._id}`, form)
            const updatedUser = { ...user, ...response.data.user }
            localStorage.setItem("user", JSON.stringify(updatedUser))
            setFeedback({ text: 'Profile updated successfully!', type: 'success' })
            setEditing(false)
            setTimeout(() => setFeedback({ text: '', type: '' }), 2000)
        } catch (error) {
            setFeedback({
                text: error.response?.data?.message || 'Update failed',
                type: 'error'
            })
            setTimeout(() => setFeedback({ text: '', type: '' }), 2000)
        }
    }

    const handleCancel = () => {
        setForm({
            name: user?.name || '',
            username: user?.username || '',
            email: user?.email || '',
            phone: user?.phone || '',
            companyName: user?.companyName || '',
            companyDescription: user?.companyDescription || '',
            companyLocation: user?.companyLocation || '',
        })
        setEditing(false)
    }

    const tabs = [
        { id: "info", label: "Personal Info", icon: <FiUser /> },
        { id: "company", label: "Company Info", icon: <FiBriefcase /> },
    ]

    return (
        <div className='flex flex-col w-full min-h-screen bg-surface text-text-primary'>

            <RecruiterNavBar />

            <div className='flex flex-1'>
                <RecruiterSideBar />

                <div className='flex-1 p-5 sm:p-10'>

                    {/* Header */}
                    <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center gap-4'>
                            <div className='w-16 h-16 flex items-center justify-center rounded-full border-2 border-primary-hover text-primary-hover text-2xl font-bold bg-secondary'>
                                {user?.companyName?.charAt(0) || user?.name?.charAt(0) || 'R'}
                            </div>
                            <div>
                                <p className='text-xl font-semibold'>{user?.companyName || user?.name}</p>
                                <p className='text-text-secondary text-sm'>@{user?.username}</p>
                            </div>
                        </div>

                        {!editing
                            ? <button
                                onClick={() => setEditing(true)}
                                className='flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-xl hover:bg-secondary transition-all duration-200 cursor-pointer'
                            >
                                <FiEdit2 /> Edit Profile
                            </button>
                            : <div className='flex gap-2'>
                                <button
                                    onClick={handleSave}
                                    className='flex items-center gap-2 text-sm bg-primary px-4 py-2 rounded-xl hover:bg-primary/80 transition-all duration-200 cursor-pointer'
                                >
                                    <FiSave /> Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className='flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-xl hover:bg-secondary transition-all duration-200 cursor-pointer'
                                >
                                    <FiX /> Cancel
                                </button>
                            </div>
                        }
                    </div>

                    {/* Feedback */}
                    {feedback.text && (
                        <div className={`text-xs px-4 py-2 rounded-lg mb-4 w-fit
                            ${feedback.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                            {feedback.text}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className='flex gap-2 flex-wrap border-b border-border mb-6'>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 text-sm px-4 py-2 border-b-2 transition-all duration-200 cursor-pointer -mb-px
                                    ${activeTab === tab.id
                                        ? 'border-primary-hover text-primary-hover'
                                        : 'border-transparent text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab: Personal Info */}
                    {activeTab === "info" && (
                        <div className='bg-background rounded-xl p-5 flex flex-col gap-4 max-w-lg'>
                            {[
                                { label: "Full Name", key: "name", icon: <FiUser /> },
                                { label: "Username", key: "username", icon: <FiUser /> },
                                { label: "Email", key: "email", icon: <FiMail /> },
                                { label: "Phone", key: "phone", icon: <FiPhone /> },
                            ].map(({ label, key, icon }) => (
                                <div key={key}>
                                    <p className='text-xs text-text-secondary mb-1'>{label}</p>
                                    {editing
                                        ? <input
                                            className='w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-hover transition-colors'
                                            value={form[key]}
                                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                        />
                                        : <p className='text-sm font-medium flex items-center gap-2'>
                                            {icon} {form[key] || '��'}
                                        </p>
                                    }
                                </div>
                            ))}
                            <div>
                                <p className='text-xs text-text-secondary mb-1'>Role</p>
                                <p className='text-sm font-medium capitalize'>{user?.role}</p>
                            </div>
                        </div>
                    )}

                    {/* Tab: Company Info */}
                    {activeTab === "company" && (
                        <div className='bg-background rounded-xl p-5 flex flex-col gap-4 max-w-lg'>
                            {[
                                { label: "Company Name", key: "companyName", icon: <FiBriefcase /> },
                                { label: "Company Location", key: "companyLocation", icon: <FiMapPin /> },
                            ].map(({ label, key, icon }) => (
                                <div key={key}>
                                    <p className='text-xs text-text-secondary mb-1'>{label}</p>
                                    {editing
                                        ? <input
                                            className='w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-hover transition-colors'
                                            value={form[key]}
                                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                        />
                                        : <p className='text-sm font-medium flex items-center gap-2'>
                                            {icon} {form[key] || '—'}
                                        </p>
                                    }
                                </div>
                            ))}
                            <div>
                                <p className='text-xs text-text-secondary mb-1'>Company Description</p>
                                {editing
                                    ? <textarea
                                        className='w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-hover transition-colors min-h-[120px] resize-none'
                                        value={form.companyDescription}
                                        onChange={(e) => setForm({ ...form, companyDescription: e.target.value })}
                                        placeholder='Tell candidates about your company...'
                                    />
                                    : <p className='text-sm font-medium'>
                                        {form.companyDescription || 'No description provided.'}
                                    </p>
                                }
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Profile
