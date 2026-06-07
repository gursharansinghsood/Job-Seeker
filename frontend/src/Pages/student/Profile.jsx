import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Footer from '../../components/Footer'
import { FiUser, FiEdit2, FiSave, FiX, FiUpload, FiFileText, FiHeart, FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi'
import { API } from '../../service/api'
import useAxios from '../../service/CustomHook'
import { Link } from 'react-router-dom'

const statusConfig = {
    pending:     { label: 'Pending',     color: 'bg-warning/10 text-warning border-warning' },
    shortlisted: { label: 'Shortlisted', color: 'bg-success/10 text-success border-success' },
    rejected:    { label: 'Rejected',    color: 'bg-danger/10 text-danger border-danger'   },
}

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const [editing, setEditing] = useState(false)
    const [activeTab, setActiveTab] = useState("info")
    const [feedback, setFeedback] = useState({ text: '', type: '' })
    const [skillInput, setSkillInput] = useState("")
    const [resume, setResume] = useState(null)

    const [form, setForm] = useState({
        name: user?.name || '',
        username: user?.username || '',
        email: user?.email || '',
        skills: user?.skills || [],
    })

    // Real data fetch
    const { data: appliedData, loading: appliedLoading } = useAxios(`/applied/${user?._id}`)
    const { data: savedData, loading: savedLoading } = useAxios(`/saved/${user?._id}`)

    const appliedJobs = appliedData?.appliedJobs || []
    const savedJobs = savedData?.savedJobs || []

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
            skills: user?.skills || [],
        })
        setEditing(false)
    }

    const addSkill = () => {
        if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
            setForm({ ...form, skills: [...form.skills, skillInput.trim()] })
            setSkillInput("")
        }
    }

    const removeSkill = (idx) => {
        setForm({ ...form, skills: form.skills.filter((_, i) => i !== idx) })
    }

    const tabs = [
        { id: "info",    label: "Info",         icon: <FiUser /> },
        { id: "skills",  label: "Skills",        icon: <FiBriefcase /> },
        { id: "resume",  label: "Resume",         icon: <FiFileText /> },
        { id: "applied", label: "Applied Jobs",   icon: <FiBriefcase /> },
        { id: "saved",   label: "Saved Jobs",     icon: <FiHeart /> },
    ]

    return (
        <div className='flex flex-col w-full min-h-screen bg-surface text-text-primary'>
            <NavBar />

            <div className='flex flex-1'>
                <SideBar />

                <div className='flex-1 p-5 sm:p-10'>

                    {/* Header */}
                    <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center gap-4'>
                            <div className='w-16 h-16 flex items-center justify-center rounded-full border-2 border-primary-hover text-primary-hover text-2xl font-bold bg-secondary'>
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className='text-xl font-semibold'>{user?.name}</p>
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

                    {/* Tab: Info */}
                    {activeTab === "info" && (
                        <div className='bg-background rounded-xl p-5 flex flex-col gap-4 max-w-lg'>
                            {[
                                { label: "Full Name", key: "name" },
                                { label: "Username",  key: "username" },
                                { label: "Email",     key: "email" },
                            ].map(({ label, key }) => (
                                <div key={key}>
                                    <p className='text-xs text-text-secondary mb-1'>{label}</p>
                                    {editing
                                        ? <input
                                            className='w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-hover transition-colors'
                                            value={form[key]}
                                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                          />
                                        : <p className='text-sm font-medium'>{form[key] || '—'}</p>
                                    }
                                </div>
                            ))}
                            <div>
                                <p className='text-xs text-text-secondary mb-1'>Role</p>
                                <p className='text-sm font-medium capitalize'>{user?.role}</p>
                            </div>
                        </div>
                    )}

                    {/* Tab: Skills */}
                    {activeTab === "skills" && (
                        <div className='bg-background rounded-xl p-5 max-w-lg'>
                            <p className='text-lg font-medium mb-4'>Skills</p>
                            {editing && (
                                <div className='flex gap-2 mb-4'>
                                    <input
                                        type='text'
                                        placeholder='Add a skill...'
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && addSkill()}
                                        className='flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-hover transition-colors'
                                    />
                                    <button onClick={addSkill} className='bg-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/80 transition-all cursor-pointer'>
                                        Add
                                    </button>
                                </div>
                            )}
                            <div className='flex flex-wrap gap-2'>
                                {form.skills.length > 0
                                    ? form.skills.map((skill, idx) => (
                                        <span key={idx} className='flex items-center gap-1 text-xs bg-secondary text-primary-hover px-3 py-1.5 rounded-full'>
                                            {skill}
                                            {editing && <FiX className='cursor-pointer hover:text-danger ml-1' onClick={() => removeSkill(idx)} />}
                                        </span>
                                    ))
                                    : <p className='text-sm text-text-secondary'>No skills added yet.</p>
                                }
                            </div>
                        </div>
                    )}

                    {/* Tab: Resume */}
                    {activeTab === "resume" && (
                        <div className='bg-background rounded-xl p-5 max-w-lg'>
                            <p className='text-lg font-medium mb-4'>Resume</p>
                            {resume
                                ? <div className='flex items-center justify-between bg-secondary px-4 py-3 rounded-xl'>
                                    <div className='flex items-center gap-2 text-sm'>
                                        <FiFileText className='text-primary-hover' />
                                        <span>{resume.name}</span>
                                    </div>
                                    <button onClick={() => setResume(null)} className='text-danger text-xs hover:underline cursor-pointer'>Remove</button>
                                  </div>
                                : <label className='flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-10 cursor-pointer hover:border-primary-hover transition-colors duration-200'>
                                    <FiUpload className='text-3xl text-text-secondary mb-2' />
                                    <p className='text-sm text-text-secondary'>Click to upload resume</p>
                                    <p className='text-xs text-text-secondary mt-1'>PDF, DOC, DOCX (max 5MB)</p>
                                    <input type='file' accept='.pdf,.doc,.docx' className='hidden' onChange={(e) => setResume(e.target.files[0])} />
                                  </label>
                            }
                        </div>
                    )}

                    {/* Tab: Applied Jobs */}
                    {activeTab === "applied" && (
                        <div className='flex flex-col gap-4'>
                            {appliedLoading && <p className='text-text-secondary text-sm'>Loading...</p>}
                            {appliedJobs.length > 0 ? appliedJobs.map((application, idx) => {
                                const job = application.postId
                                const status = statusConfig[application.status] || statusConfig.pending
                                const appliedDate = new Date(application.appliedAt).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })
                                return (
                                    <div key={idx} className='bg-background border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary-hover transition-all duration-200'>
                                        <div className='flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary-hover text-primary-hover font-bold'>
                                            {job?.companyName?.charAt(0)}
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-sm font-semibold truncate'>{job?.jobTitle}</p>
                                            <div className='flex flex-wrap gap-3 mt-1'>
                                                <span className='flex items-center gap-1 text-xs text-text-secondary'><FiBriefcase /> {job?.companyName}</span>
                                                <span className='flex items-center gap-1 text-xs text-text-secondary'><FiMapPin /> {job?.location}</span>
                                                <span className='flex items-center gap-1 text-xs text-text-secondary'><FiCalendar /> {appliedDate}</span>
                                            </div>
                                        </div>
                                        <div className='flex sm:flex-col items-center sm:items-end gap-2'>
                                            <span className={`text-xs px-3 py-1 rounded-full border font-medium ${status.color}`}>{status.label}</span>
                                            <Link to={`/student/job/${job?._id}`} className='text-xs text-primary-hover border border-primary-hover px-3 py-1.5 rounded-xl hover:bg-primary hover:text-text-primary transition-all duration-200'>
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }) : !appliedLoading && (
                                <p className='text-text-secondary text-sm text-center mt-10'>No applied jobs yet.</p>
                            )}
                        </div>
                    )}

                    {/* Tab: Saved Jobs */}
                    {activeTab === "saved" && (
                        <div className='flex flex-col gap-4'>
                            {savedLoading && <p className='text-text-secondary text-sm'>Loading...</p>}
                            {savedJobs.length > 0 ? savedJobs.map((item, idx) => {
                                const job = item.postId
                                return (
                                    <div key={idx} className='bg-background border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary-hover transition-all duration-200'>
                                        <div className='flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary-hover text-primary-hover font-bold'>
                                            {job?.companyName?.charAt(0)}
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-sm font-semibold truncate'>{job?.jobTitle}</p>
                                            <div className='flex flex-wrap gap-3 mt-1'>
                                                <span className='flex items-center gap-1 text-xs text-text-secondary'><FiBriefcase /> {job?.companyName}</span>
                                                <span className='flex items-center gap-1 text-xs text-text-secondary'><FiMapPin /> {job?.location}</span>
                                            </div>
                                            <p className='text-xs text-primary-hover font-medium mt-1'>
                                                ₹{job?.salaryRange?.min / 100000} - ₹{job?.salaryRange?.max / 100000} LPA
                                            </p>
                                        </div>
                                        <Link to={`/student/job/${job?._id}`} className='text-xs text-primary-hover border border-primary-hover px-3 py-1.5 rounded-xl hover:bg-primary hover:text-text-primary transition-all duration-200 whitespace-nowrap'>
                                            View Details
                                        </Link>
                                    </div>
                                )
                            }) : !savedLoading && (
                                <p className='text-text-secondary text-sm text-center mt-10'>No saved jobs yet.</p>
                            )}
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Profile