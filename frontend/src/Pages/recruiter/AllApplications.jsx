// Pages/recruiter/AllApplications.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecruiterNavBar from '../../components/RecruiterNavBar'
import RecruiterSideBar from '../../components/RecruiterSideBar'
import Footer from '../../components/Footer'
import useAxios from '../../service/CustomHook'
import { API } from '../../service/api'
import { FiMapPin, FiBriefcase, FiMail, FiUser, FiClock, FiCheck, FiX, FiArrowRight } from 'react-icons/fi'

const statusConfig = {
    pending: { label: 'Pending', color: 'bg-warning/10 text-warning border-warning' },
    shortlisted: { label: 'Shortlist', color: 'bg-success/10 text-success border-success' },
    rejected: { label: 'Reject', color: 'bg-danger/10 text-danger border-danger' },
}

const AllApplications = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [posts, setPosts] = useState([])
    const [allApplicants, setAllApplicants] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch all posts by this recruiter
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsRes = await API.get(`/recruiter/myposts/${user?.username}`)
                const postsData = postsRes.data.posts || []
                setPosts(postsData)

                // Fetch all applicants for all posts
                let applicants = []
                for (const post of postsData) {
                    const res = await API.get(`/recruiter/applicants/${post._id}`)
                    const appData = res.data.applicants || []
                    applicants = [...applicants, ...appData.map(a => ({ ...a, jobTitle: post.jobTitle, companyName: post.companyName }))]
                }
                setAllApplicants(applicants)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        if (user?.username) fetchData()
    }, [user?.username])

    const handleStatus = async (id, status) => {
        try {
            await API.put(`/applied/status/${id}`, { status })
            // Refresh data
            const res = await API.get(`/recruiter/myposts/${user?.username}`)
            const postsData = res.data.posts || []
            setPosts(postsData)

            let applicants = []
            for (const post of postsData) {
                const res = await API.get(`/recruiter/applicants/${post._id}`)
                const appData = res.data.applicants || []
                applicants = [...applicants, ...appData.map(a => ({ ...a, jobTitle: post.jobTitle, companyName: post.companyName }))]
            }
            setAllApplicants(applicants)
        } catch (error) {
            console.error(error)
        }
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
                    <p className='text-2xl font-semibold mb-1'>All Applications</p>
                    <p className='text-sm text-text-secondary mb-6'>
                        {allApplicants.length} applicant{allApplicants.length !== 1 ? 's' : ''} across {posts.length} job{posts.length !== 1 ? 's' : ''}
                    </p>

                    {/* Stats */}
                    <div className='grid grid-cols-3 gap-4 mb-8'>
                        {[
                            { label: 'Pending', value: allApplicants.filter(a => a.status === 'pending').length, color: 'text-warning' },
                            { label: 'Shortlisted', value: allApplicants.filter(a => a.status === 'shortlisted').length, color: 'text-success' },
                            { label: 'Rejected', value: allApplicants.filter(a => a.status === 'rejected').length, color: 'text-danger' },
                        ].map((stat, idx) => (
                            <div key={idx} className='bg-background border border-border rounded-xl p-4 flex flex-col items-center justify-center'>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                <p className='text-xs text-text-secondary mt-1'>{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Applicants List */}
                    <div className='flex flex-col gap-4'>
                        {allApplicants.length > 0 ? (
                            allApplicants.map((application, idx) => {
                                const user = application.userId
                                const status = statusConfig[application.status] || statusConfig.pending
                                const appliedDate = new Date(application.appliedAt).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })

                                return (
                                    <div key={idx} className='bg-background border border-border rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary-hover transition-all duration-200'>

                                        {/* User Avatar */}
                                        <div className='flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border-2 border-primary-hover text-primary-hover text-xl font-bold'>
                                            {user?.name?.charAt(0)}
                                        </div>

                                        {/* User Info */}
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center gap-2 flex-wrap'>
                                                <p className='text-sm md:text-base font-semibold'>{user?.name}</p>
                                                <span className='text-xs text-text-secondary'>(@{user?.username})</span>
                                            </div>

                                            <div className='flex flex-wrap gap-3 mt-1'>
                                                <span className='flex items-center gap-1 text-xs text-primary-hover'>
                                                    <FiBriefcase /> {application.jobTitle}
                                                </span>
                                                <span className='flex items-center gap-1 text-xs text-text-secondary'>
                                                    <FiClock /> Applied: {appliedDate}
                                                </span>
                                            </div>

                                            <div className='flex flex-wrap gap-3 mt-1'>
                                                {user?.email && (
                                                    <span className='flex items-center gap-1 text-xs text-text-secondary'>
                                                        <FiMail /> {user.email}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Skills */}
                                            {user?.skills?.length > 0 && (
                                                <div className='flex flex-wrap gap-2 mt-2'>
                                                    {user.skills.slice(0, 5).map((skill, i) => (
                                                        <span key={i} className='text-xs bg-secondary text-primary-hover px-2 py-0.5 rounded-full'>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {user.skills.length > 5 && (
                                                        <span className='text-xs text-text-secondary'>+{user.skills.length - 5} more</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Status + Actions */}
                                        <div className='flex sm:flex-col items-center sm:items-end gap-3'>
                                            <span className={`text-xs px-3 py-1 rounded-full border font-medium ${status.color}`}>
                                                {status.label}
                                            </span>

                                            <div className='flex gap-2'>
                                                <button
                                                    onClick={() => handleStatus(application._id, 'shortlisted')}
                                                    disabled={application.status === 'shortlisted'}
                                                    className='flex items-center gap-1 text-xs text-success border border-success px-3 py-1.5 rounded-xl hover:bg-success/10 transition-all duration-200 disabled:opacity-50 cursor-pointer'
                                                >
                                                    <FiCheck /> Accept
                                                </button>
                                                <button
                                                    onClick={() => handleStatus(application._id, 'rejected')}
                                                    disabled={application.status === 'rejected'}
                                                    className='flex items-center gap-1 text-xs text-danger border border-danger px-3 py-1.5 rounded-xl hover:bg-danger/10 transition-all duration-200 disabled:opacity-50 cursor-pointer'
                                                >
                                                    <FiX /> Reject
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        ) : (
                            !loading && (
                                <div className='flex flex-col items-center justify-center mt-20 gap-3'>
                                    <FiUser className='text-5xl text-text-secondary' />
                                    <p className='text-text-secondary text-sm'>No applicants yet.</p>
                                    <p className='text-xs text-text-secondary'>Post jobs to get applicants</p>
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

export default AllApplications
