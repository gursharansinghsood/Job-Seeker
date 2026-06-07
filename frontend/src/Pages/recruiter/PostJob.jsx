// Pages/recruiter/PostJob.jsx
import React, { useState } from 'react'
import RecruiterNavBar from '../../components/RecruiterNavBar'
import RecruiterSideBar from '../../components/RecruiterSideBar'
import Footer from '../../components/Footer'
import { useForm } from 'react-hook-form'
import { API } from '../../service/api'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState({ text: '', type: '' })
    const [skills, setSkills] = useState([])
    const [skillInput, setSkillInput] = useState("")

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()])
            setSkillInput("")
        }
    }

    const removeSkill = (idx) => {
        setSkills(skills.filter((_, i) => i !== idx))
    }

    const onSubmit = async (data) => {
        if (skills.length === 0) {
            setFeedback({ text: 'Please add at least one skill', type: 'error' })
            return
        }

        try {
            setLoading(true)
            await API.post('/recruiter/posts', {
                ...data,
                skills,
                username: user?.username,
                companyName: user?.companyname,
                salaryRange: {
                    min: Number(data.salaryMin),
                    max: Number(data.salaryMax)
                }
            })

            setFeedback({ text: 'Job posted successfully!', type: 'success' })
            reset()
            setSkills([])
            setTimeout(() => navigate('/recruiter/myjobs'), 1000)

        } catch (error) {
            setFeedback({
                text: error.response?.data?.message || 'Something went wrong',
                type: 'error'
            })
        } finally {
            setLoading(false)
            setTimeout(() => setFeedback({ text: '', type: '' }), 2000)
        }
    }

    const inputClass = 'w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-hover transition-colors disabled:opacity-60'
    const labelClass = 'text-xs font-medium text-text-secondary mb-1 block'
    const errorClass = 'text-danger text-xs mt-1'
    const sectionClass = 'flex flex-col'

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
                    <p className='text-2xl font-semibold mb-1'>Post a Job</p>
                    <p className='text-sm text-text-secondary mb-6'>Fill in the details to post a new job</p>

                    {feedback.text && (
                        <div className={`text-xs px-4 py-2 rounded-lg mb-4 w-fit
                            ${feedback.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                            {feedback.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className='bg-background rounded-xl p-5 sm:p-8 max-w-2xl flex flex-col gap-5'>

                        {/* Job Title */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Job Title</label>
                            <input
                                className={inputClass}
                                placeholder='e.g. Frontend Developer'
                                disabled={loading}
                                {...register("jobTitle", { required: "Job title is required" })}
                            />
                            {errors.jobTitle && <p className={errorClass}>{errors.jobTitle.message}</p>}
                        </div>

                        {/* Job Description */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Job Description</label>
                            <textarea
                                className={`${inputClass} resize-none h-28`}
                                placeholder='Describe the job role and responsibilities...'
                                disabled={loading}
                                {...register("jobDescription", { required: "Job description is required" })}
                            />
                            {errors.jobDescription && <p className={errorClass}>{errors.jobDescription.message}</p>}
                        </div>

                        {/* Location + Job Type */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                            <div className={sectionClass}>
                                <label className={labelClass}>Location</label>
                                <input
                                    className={inputClass}
                                    placeholder='e.g. Delhi, India'
                                    disabled={loading}
                                    {...register("location", { required: "Location is required" })}
                                />
                                {errors.location && <p className={errorClass}>{errors.location.message}</p>}
                            </div>

                            <div className={sectionClass}>
                                <label className={labelClass}>Job Type</label>
                                <select
                                    className={inputClass}
                                    disabled={loading}
                                    {...register("jobType", { required: "Job type is required" })}
                                >
                                    <option value="">Select job type</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Internship">Internship</option>
                                </select>
                                {errors.jobType && <p className={errorClass}>{errors.jobType.message}</p>}
                            </div>
                        </div>

                        {/* Experience + Salary */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
                            <div className={sectionClass}>
                                <label className={labelClass}>Experience</label>
                                <input
                                    className={inputClass}
                                    placeholder='e.g. 2-3 years'
                                    disabled={loading}
                                    {...register("experience", { required: "Experience is required" })}
                                />
                                {errors.experience && <p className={errorClass}>{errors.experience.message}</p>}
                            </div>

                            <div className={sectionClass}>
                                <label className={labelClass}>Min Salary (LPA)</label>
                                <input
                                    type='number'
                                    className={inputClass}
                                    placeholder='e.g. 5'
                                    disabled={loading}
                                    {...register("salaryMin", { required: "Min salary is required" })}
                                />
                                {errors.salaryMin && <p className={errorClass}>{errors.salaryMin.message}</p>}
                            </div>

                            <div className={sectionClass}>
                                <label className={labelClass}>Max Salary (LPA)</label>
                                <input
                                    type='number'
                                    className={inputClass}
                                    placeholder='e.g. 10'
                                    disabled={loading}
                                    {...register("salaryMax", { required: "Max salary is required" })}
                                />
                                {errors.salaryMax && <p className={errorClass}>{errors.salaryMax.message}</p>}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Required Skills</label>
                            <div className='flex gap-2 mb-3'>
                                <input
                                    type='text'
                                    placeholder='Add a skill...'
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill() } }}
                                    className={inputClass}
                                />
                                <button
                                    type='button'
                                    onClick={addSkill}
                                    className='bg-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/80 transition-all cursor-pointer whitespace-nowrap'
                                >
                                    Add
                                </button>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {skills.length > 0
                                    ? skills.map((skill, idx) => (
                                        <span key={idx} className='flex items-center gap-1 text-xs bg-secondary text-primary-hover px-3 py-1.5 rounded-full'>
                                            {skill}
                                            <button type='button' onClick={() => removeSkill(idx)} className='ml-1 hover:text-danger cursor-pointer'>✕</button>
                                        </span>
                                    ))
                                    : <p className='text-xs text-text-secondary'>No skills added yet.</p>
                                }
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='bg-primary hover:bg-primary/80 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-2'
                        >
                            {loading ? 'Posting...' : 'Post Job'}
                        </button>

                    </form>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default PostJob