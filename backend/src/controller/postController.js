const postModel = require('../model/postModel')
const appliedJobModel = require('../model/appliedJobModel')

const createPost = async (req, res) => {
    try {
        const { jobTitle, jobDescription, location, jobType, experience, salaryRange, skills, username, companyName } = req.body

        if (!jobTitle || !jobDescription || !location || !jobType || !experience || !skills || !username || !companyName) {
            return res.status(400).json({ message: "All fields are required" })
        }

        await postModel.create({
            jobTitle, jobDescription, location, jobType,
            experience, salaryRange, skills, username, companyName
        })

        res.status(201).json({ message: "Job Posted" })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getPost = async (req, res) => {
    try {
        const posts = await postModel.find()

        if (posts.length === 0) {
            return res.status(200).json({ message: "No posts available" })
        }

        res.status(200).json({ message: "Post Fetched Successfully", posts })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)  // ← Post → postModel

        if (!post) {
            return res.status(404).json({ message: "Job not found" })
        }

        res.status(200).json({ post })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getPostByUsername = async (req, res) => {
    try {
        const posts = await postModel.find({ username: req.params.username })

        res.status(200).json({ posts })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Applications dekhna — ek post ke saare applicants
const getApplicantsByPost = async (req, res) => {
    try {
        const applicants = await appliedJobModel
            .find({ postId: req.params.postId })
            .populate('userId', 'name username email skills')

        res.status(200).json({ applicants })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createPost, getPost, getPostById, getPostByUsername, getApplicantsByPost }