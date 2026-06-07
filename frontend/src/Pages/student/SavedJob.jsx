// Pages/student/SavedJob.jsx
import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Footer from '../../components/Footer'
import { FiMapPin, FiBriefcase, FiHeart, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useAxios from '../../service/CustomHook'
import { API } from '../../service/api'

const SavedJob = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const { data, loading, refetch } = useAxios(`/saved/${user?._id}`)
    const [removing, setRemoving] = useState(null)

    const savedJobs = data?.savedJobs || []

    const handleUnsave = async (postId) => {
        try {
            setRemoving(postId)
            await API.delete(`/saved/unsave/${user?._id}/${postId}`)
            refetch()
        } catch (error) {
            console.error(error)
        } finally {
            setRemoving(null)
        }
    }

    return (
        <div className='flex flex-col w-full min-h-screen bg-surface text-text-primary'>

            {loading && (
                <div className='fixed inset-0 z-50 bg-black/40 flex justify-center items-center'>
                    <div className='border-4 w-10 h-10 border-white border-t-transparent animate-spin rounded-full' />
                </div>
            )}

            <NavBar />

            <div className='flex flex-1'>
                <SideBar />

                <div className='flex-1 p-5 sm:p-10'>
                    <p className='text-2xl font-semibold mb-1'>Saved Jobs</p>
                    <p className='text-sm text-text-secondary mb-6'>
                        {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved
                    </p>

                    <div className='flex flex-col gap-4'>
                        {savedJobs.length > 0 ? (
                            savedJobs.map((item, idx) => {
                                const job = item.postId

                                return (
                                    <div key={idx} className='bg-background border border-border rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary-hover transition-all duration-200'>

                                        {/* Company Initial */}
                                        <div className='flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border-2 border-primary-hover text-primary-hover text-xl font-bold'>
                                            {job?.companyName?.charAt(0)}
                                        </div>

                                        {/* Job Info */}
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-sm md:text-base font-semibold truncate'>{job?.jobTitle}</p>

                                            <div className='flex flex-wrap gap-3 mt-1'>
                                                <span className='flex items-center gap-1 text-xs text-text-secondary'>
                                                    <FiBriefcase /> {job?.companyName}
                                                </span>
                                                <span className='flex items-center gap-1 text-xs text-text-secondary'>
                                                    <FiMapPin /> {job?.location}
                                                </span>
                                            </div>

                                            <p className='text-xs text-primary-hover font-medium mt-1'>
                                                ₹{job?.salaryRange?.min } - ₹{job?.salaryRange?.max} LPA
                                            </p>
                                        </div>

                                        {/* Right — Buttons */}
                                        <div className='flex sm:flex-col items-center sm:items-end gap-2'>
                                            <Link
                                                to={`/student/job/${job?._id}`}
                                                className='text-xs text-primary-hover border border-primary-hover px-3 py-1.5 rounded-xl hover:bg-primary hover:text-text-primary transition-all duration-200 whitespace-nowrap'
                                            >
                                                View Details
                                            </Link>
                                            <button
                                                onClick={() => handleUnsave(job?._id)}
                                                disabled={removing === job?._id}
                                                className='flex items-center gap-1 text-xs text-danger border border-danger px-3 py-1.5 rounded-xl hover:bg-danger/10 transition-all duration-200 cursor-pointer disabled:opacity-50'
                                            >
                                                <FiTrash2 />
                                                {removing === job?._id ? 'Removing...' : 'Remove'}
                                            </button>
                                        </div>

                                    </div>
                                )
                            })
                        ) : (
                            !loading && (
                                <div className='flex flex-col items-center justify-center mt-20 gap-3'>
                                    <FiHeart className='text-5xl text-text-secondary' />
                                    <p className='text-text-secondary text-sm'>No saved jobs yet.</p>
                                    <Link to='/student/browsejob' className='text-sm text-primary-hover hover:underline'>
                                        Browse Jobs
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

export default SavedJob