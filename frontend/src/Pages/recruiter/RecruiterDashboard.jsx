// Pages/recruiter/RecruiterDashboard.jsx
import React, { useEffect, useState } from 'react'
import RecruiterNavBar from '../../components/RecruiterNavBar'
import SideBar from '../../components/SideBar'
import Footer from '../../components/Footer'
import useAxios from '../../service/CustomHook'
import { FiBriefcase, FiUsers, FiFileText, FiMapPin, FiClock } from 'react-icons/fi'
import RecruiterSideBar from '../../components/RecruiterSideBar'
import { API } from '../../service/api'

const RecruiterDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const { data, loading } = useAxios(`/recruiter/myposts/${user?.username}`)

    const [stats, setStats] = useState({ totalApplicants: 0, shortlisted: 0, rejected: 0 })

    const posts = data?.posts || []

    // Calculate stats from posts
    useEffect(() => {
        const fetchStats = async () => {
            if (!posts.length) return
            try {
                let totalApplicants = 0
                let shortlisted = 0
                let rejected = 0

                for (const post of posts) {
                    const res = await API.get(`/recruiter/applicants/${post._id}`)
                    const applicants = res.data.applicants || []
                    totalApplicants += applicants.length
                    shortlisted += applicants.filter(a => a.status === 'shortlisted').length
                    rejected += applicants.filter(a => a.status === 'rejected').length
                }

                setStats({ totalApplicants, shortlisted, rejected })
            } catch (error) {
                console.error(error)
            }
        }
        fetchStats()
    }, [posts])

    const miniCards = [
        { number: posts.length, text: "Total Jobs Posted", color: "text-primary" },
        { number: stats.totalApplicants, text: "Total Applicants", color: "text-success" },
        { number: stats.shortlisted, text: "Shortlisted", color: "text-warning" },
        { number: stats.rejected, text: "Rejected", color: "text-danger" },
    ]

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
                    <p className='text-xl font-medium mb-2'>Welcome, {user?.name} 👋</p>
                    <p className='text-sm text-text-secondary mb-6'>
                        Manage your job postings and applications
                    </p>

                    {/* Mini Cards */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-10'>
                        {miniCards.map((item, idx) => (
                            <div key={idx} className='bg-background border border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-2'>
                                <p className={`text-3xl font-bold ${item.color}`}>{item.number}</p>
                                <p className='text-xs text-text-secondary text-center'>{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Posted Jobs */}
                    <p className='text-lg font-medium mb-4'>Your Posted Jobs</p>
                    <div className='grid grid-cols-1 gap-4'>
                        {posts.length > 0
                            ? posts.slice(0, 4).map((post, idx) => (
                                <div key={idx} className='bg-background border border-border rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary-hover transition-all duration-200'>
                                    <div className='flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary-hover text-primary-hover font-bold'>
                                        {post?.companyName?.charAt(0)}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm font-semibold truncate'>{post?.jobTitle}</p>
                                        <div className='flex flex-wrap gap-3 mt-1'>
                                            <span className='flex items-center gap-1 text-xs text-text-secondary'><FiMapPin /> {post?.location}</span>
                                            <span className='flex items-center gap-1 text-xs text-text-secondary'><FiBriefcase /> {post?.jobType}</span>
                                            <span className='flex items-center gap-1 text-xs text-text-secondary'><FiClock /> {post?.experience}</span>
                                        </div>
                                    </div>
                                    <p className='text-xs text-primary-hover font-medium'>
                                        ₹{post?.salaryRange?.min } - ₹{post?.salaryRange?.max } LPA
                                    </p>
                                </div>
                            ))
                            : !loading && (
                                <p className='text-text-secondary text-sm text-center mt-10'>No jobs posted yet.</p>
                            )
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default RecruiterDashboard