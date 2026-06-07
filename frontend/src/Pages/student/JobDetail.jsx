import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAxios from '../../service/CustomHook'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Footer from '../../components/Footer'
import { FiMapPin, FiBriefcase, FiClock, FiArrowLeft, FiHeart } from 'react-icons/fi'
import { API } from '../../service/api'

const JobDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const { data, loading } = useAxios(`/recruiter/posts/${id}`)
    const { data: saveData } = useAxios(`/saved/check/${user?._id}/${id}`)

    const [saved, setSaved] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [applied, setApplied] = useState(false)
    const [applyLoading, setApplyLoading] = useState(false)
    const [feedback, setFeedback] = useState({ text: '', type: '' })

    const job = data?.post

    // Check save status
    useEffect(() => {
        if (saveData?.saved !== undefined) {
            setSaved(saveData.saved)
        }
    }, [saveData])

    // Check apply status
    useEffect(() => {
        const checkApplied = async () => {
            try {
                const res = await API.get(`/applied/check/${user?._id}/${id}`)
                setApplied(res.data.applied)
            } catch (error) {
                console.error(error)
            }
        }
        if (user?._id && id) checkApplied()
    }, [id])

    // Save / Unsave toggle
    const handleSave = async () => {
        try {
            setSaveLoading(true)
            if (saved) {
                await API.delete(`/saved/unsave/${user?._id}/${id}`)
                setSaved(false)
                setFeedback({ text: 'Job removed from saved', type: 'error' })
            } else {
                await API.post('/saved/save', { userId: user?._id, postId: id })
                setSaved(true)
                setFeedback({ text: 'Job saved successfully!', type: 'success' })
            }
        } catch (error) {
            setFeedback({ text: 'Something went wrong', type: 'error' })
        } finally {
            setSaveLoading(false)
            setTimeout(() => setFeedback({ text: '', type: '' }), 2000)
        }
    }

    // Apply
    const handleApply = async () => {
        try {
            setApplyLoading(true)
            await API.post('/applied/apply', { userId: user?._id, postId: id })
            setApplied(true)
            setFeedback({ text: 'Applied successfully!', type: 'success' })
        } catch (error) {
            setFeedback({ 
                text: error.response?.data?.message || 'Something went wrong', 
                type: 'error' 
            })
        } finally {
            setApplyLoading(false)
            setTimeout(() => setFeedback({ text: '', type: '' }), 2000)
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

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className='flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 mb-6 cursor-pointer'
                    >
                        <FiArrowLeft /> Back
                    </button>

                    {job && (
                        <>
                            {/* Header */}
                            <div className='flex items-start justify-between gap-4 mb-6'>
                                <div className='flex items-center gap-4'>
                                    <div className='w-16 h-16 flex items-center justify-center rounded-full border-2 border-primary-hover text-primary-hover text-2xl font-bold'>
                                        {job.companyName?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className='text-2xl font-semibold'>{job.jobTitle}</p>
                                        <p className='text-text-secondary text-sm'>{job.companyName}</p>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <button
                                    onClick={handleSave}
                                    disabled={saveLoading}
                                    className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer flex-shrink-0
                                        ${saved 
                                            ? 'bg-danger/10 border-danger text-danger hover:bg-danger/20' 
                                            : 'border-border text-text-secondary hover:border-danger hover:text-danger'
                                        } ${saveLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <FiHeart className={saved ? 'fill-danger text-danger' : ''} />
                                    {saved ? 'Saved' : 'Save Job'}
                                </button>
                            </div>

                            {/* Feedback */}
                            {feedback.text && (
                                <div className={`text-xs px-4 py-2 rounded-lg mb-4 w-fit
                                    ${feedback.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                                    {feedback.text}
                                </div>
                            )}

                            {/* Info Badges */}
                            <div className='flex flex-wrap gap-3 mb-6'>
                                <span className='flex items-center gap-1 text-xs bg-secondary px-3 py-1.5 rounded-full'>
                                    <FiMapPin /> {job.location}
                                </span>
                                <span className='flex items-center gap-1 text-xs bg-secondary px-3 py-1.5 rounded-full'>
                                    <FiBriefcase /> {job.jobType}
                                </span>
                                <span className='flex items-center gap-1 text-xs bg-secondary px-3 py-1.5 rounded-full'>
                                    <FiClock /> {job.experience}
                                </span>
                                <span className='flex items-center gap-1 text-xs bg-secondary px-3 py-1.5 rounded-full'>
                                    ₹{job.salaryRange?.min} - ₹{job.salaryRange?.max} LPA
                                </span>
                            </div>

                            {/* Description */}
                            <div className='bg-background rounded-xl p-5 mb-5'>
                                <p className='text-lg font-medium mb-3'>Job Description</p>
                                <p className='text-sm text-text-secondary leading-relaxed'>{job.jobDescription}</p>
                            </div>

                            {/* Skills */}
                            <div className='bg-background rounded-xl p-5 mb-5'>
                                <p className='text-lg font-medium mb-3'>Required Skills</p>
                                <div className='flex flex-wrap gap-2'>
                                    {job.skills?.map((skill, idx) => (
                                        <span key={idx} className='text-xs bg-secondary text-primary-hover px-3 py-1 rounded-full'>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Apply Button */}
                            <button
                                onClick={handleApply}
                                disabled={applied || applyLoading}
                                className={`px-8 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                                    ${applied 
                                        ? 'bg-success/10 text-success border border-success cursor-not-allowed' 
                                        : 'bg-primary hover:bg-primary/80 text-text-primary'
                                    } ${applyLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {applyLoading ? 'Applying...' : applied ? 'Already Applied ✓' : 'Apply Now'}
                            </button>
                        </>
                    )}

                    {!loading && !job && (
                        <p className='text-text-secondary text-center mt-20'>Job not found.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default JobDetail