// Pages/student/AppliedJob.jsx
import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Footer from '../../components/Footer'
import { FiMapPin, FiBriefcase, FiCalendar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useAxios from '../../service/CustomHook'

const statusConfig = {
    pending:     { label: 'Pending',     color: 'bg-warning/10 text-warning border-warning' },
    shortlisted: { label: 'Shortlisted', color: 'bg-success/10 text-success border-success' },
    rejected:    { label: 'Rejected',    color: 'bg-danger/10 text-danger border-danger'   },
}

const AppliedJob = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const { data, loading } = useAxios(`/applied/${user?._id}`)

    const appliedJobs = data?.appliedJobs || []

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
                    <p className='text-2xl font-semibold mb-1'>Applied Jobs</p>
                    <p className='text-sm text-text-secondary mb-6'>
                        Track all your job applications
                    </p>

                    {/* Stats */}
                    <div className='grid grid-cols-3 gap-4 mb-8'>
                        {[
                            { label: 'Total Applied',  value: appliedJobs.length,                                                          color: 'text-primary'  },
                            { label: 'Shortlisted',    value: appliedJobs.filter(j => j.status === 'shortlisted').length,                  color: 'text-success'  },
                            { label: 'Rejected',       value: appliedJobs.filter(j => j.status === 'rejected').length,                     color: 'text-danger'   },
                        ].map((stat, idx) => (
                            <div key={idx} className='bg-background border border-border rounded-xl p-4 flex flex-col items-center justify-center'>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                <p className='text-xs text-text-secondary mt-1'>{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Job List */}
                    <div className='flex flex-col gap-4'>
                        {appliedJobs.length > 0 ? (
                            appliedJobs.map((application, idx) => {
                                const job = application.postId
                                const status = statusConfig[application.status] || statusConfig.pending
                                const appliedDate = new Date(application.appliedAt).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })

                                return (
                                    <div key={idx} className='bg-background border border-border rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-200 hover:border-primary-hover'>

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
                                                <span className='flex items-center gap-1 text-xs text-text-secondary'>
                                                    <FiCalendar /> {appliedDate}
                                                </span>
                                            </div>

                                            {/* Salary */}
                                            <p className='text-xs text-primary-hover font-medium mt-1'>
                                                ₹{job?.salaryRange?.min} - ₹{job?.salaryRange?.max} LPA
                                            </p>
                                        </div>

                                        {/* Right — Status + Button */}
                                        <div className='flex sm:flex-col items-center sm:items-end gap-3'>
                                            <span className={`text-xs px-3 py-1 rounded-full border font-medium ${status.color}`}>
                                                {status.label}
                                            </span>
                                            <Link
                                                to={`/student/job/${job?._id}`}
                                                className='text-xs text-primary-hover border border-primary-hover px-3 py-1.5 rounded-xl hover:bg-primary hover:text-text-primary transition-all duration-200 whitespace-nowrap'
                                            >
                                                View Details
                                            </Link>
                                        </div>

                                    </div>
                                )
                            })
                        ) : (
                            !loading && (
                                <div className='flex flex-col items-center justify-center mt-20 gap-3'>
                                    <p className='text-4xl'>📋</p>
                                    <p className='text-text-secondary text-sm'>You haven't applied to any jobs yet.</p>
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

export default AppliedJob