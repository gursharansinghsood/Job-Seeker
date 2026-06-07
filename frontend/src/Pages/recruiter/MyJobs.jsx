// Pages/recruiter/MyJobs.jsx
import React from 'react'
import RecruiterNavBar from '../../components/RecruiterNavBar'
import RecruiterSideBar from '../../components/RecruiterSideBar'
import Footer from '../../components/Footer'
import useAxios from '../../service/CustomHook'
import { FiMapPin, FiBriefcase, FiClock, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const MyJobs = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const { data, loading } = useAxios(`/recruiter/myposts/${user?.username}`)

    const posts = data?.posts || []

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
                    <div className='flex items-center justify-between mb-6'>
                        <div>
                            <p className='text-2xl font-semibold'>My Posted Jobs</p>
                            <p className='text-sm text-text-secondary mt-1'>
                                {posts.length} job{posts.length !== 1 ? 's' : ''} posted
                            </p>
                        </div>
                        <Link
                            to='/recruiter/postjob'
                            className='bg-primary hover:bg-primary/80 text-text-primary text-sm px-4 py-2 rounded-xl transition-all duration-200'
                        >
                            + Post New Job
                        </Link>
                    </div>

                    <div className='flex flex-col gap-4'>
                        {posts.length > 0 ? (
                            posts.map((post, idx) => (
                                <div key={idx} className='bg-background border border-border rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary-hover transition-all duration-200'>

                                    {/* Company Initial */}
                                    <div className='flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border-2 border-primary-hover text-primary-hover text-xl font-bold'>
                                        {post?.companyName?.charAt(0)}
                                    </div>

                                    {/* Job Info */}
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm md:text-base font-semibold truncate'>{post?.jobTitle}</p>

                                        <div className='flex flex-wrap gap-3 mt-1'>
                                            <span className='flex items-center gap-1 text-xs text-text-secondary'>
                                                <FiMapPin /> {post?.location}
                                            </span>
                                            <span className='flex items-center gap-1 text-xs text-text-secondary'>
                                                <FiBriefcase /> {post?.jobType}
                                            </span>
                                            <span className='flex items-center gap-1 text-xs text-text-secondary'>
                                                <FiClock /> {post?.experience}
                                            </span>
                                        </div>

                                        <div className='flex flex-wrap gap-2 mt-2'>
                                            {post?.skills?.slice(0, 3).map((skill, i) => (
                                                <span key={i} className='text-xs bg-secondary text-primary-hover px-2 py-0.5 rounded-full'>
                                                    {skill}
                                                </span>
                                            ))}
                                            {post?.skills?.length > 3 && (
                                                <span className='text-xs text-text-secondary'>+{post.skills.length - 3} more</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right */}
                                    <div className='flex sm:flex-col items-center sm:items-end gap-3'>
                                        <p className='text-xs font-medium text-primary-hover'>
                                            ₹{post?.salaryRange?.min } - ₹{post?.salaryRange?.max } LPA
                                        </p>
                                        <Link
                                            to={`/recruiter/applications/${post?._id}`}
                                            className='flex items-center gap-1 text-xs text-primary-hover border border-primary-hover px-3 py-1.5 rounded-xl hover:bg-primary hover:text-text-primary transition-all duration-200 whitespace-nowrap'
                                        >
                                            <FiUsers /> View Applicants
                                        </Link>
                                    </div>

                                </div>
                            ))
                        ) : (
                            !loading && (
                                <div className='flex flex-col items-center justify-center mt-20 gap-3'>
                                    <p className='text-4xl'>📋</p>
                                    <p className='text-text-secondary text-sm'>No jobs posted yet.</p>
                                    <Link to='/recruiter/postjob' className='text-sm text-primary-hover hover:underline'>
                                        Post your first job
                                    </Link>
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

export default MyJobs