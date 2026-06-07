import React, { useState, useMemo } from 'react'
import SideBar from '../../components/SideBar'
import NavBar from '../../components/NavBar'
import Card from '../../components/Card'
import useAxios from '../../service/CustomHook'
import { FiSearch } from 'react-icons/fi'
import Fuse from 'fuse.js'
import Footer from '../../components/Footer'

const BrowseJob = () => {
    const { data, loading } = useAxios('/recruiter/posts')
    const [search, setSearch] = useState("")

    const fuse = useMemo(() => {
        if (!data?.posts) return null
        return new Fuse(data.posts, {
            keys: ['jobTitle', 'jobDescription', 'location', 'jobType', 'experience', 'skills', 'username', 'companyName'],
            threshold: 0.3
        })
    }, [data?.posts])

    const results = useMemo(() => {
        if (!search.trim()) return data?.posts || []
        if (!fuse) return []
        return fuse.search(search).map(r => r.item)
    }, [search, fuse, data?.posts])

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
                    <p className='text-2xl font-semibold mb-5'>Browse Jobs</p>

                    <div className='flex bg-secondary border border-border py-2 px-3 rounded-xl items-center gap-2 mb-6 focus-within:border-primary-hover transition-colors duration-200'>
                        <FiSearch className='text-text-secondary flex-shrink-0' />
                        <input
                            type="text"
                            placeholder='Search by title, company, location...'
                            className='flex-1 outline-none bg-transparent text-sm text-text-primary placeholder:text-text-secondary'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button onClick={() => setSearch("")}
                                className='text-text-secondary hover:text-text-primary text-xs cursor-pointer'>
                                Clear
                            </button>
                        )}
                    </div>

                    <p className='text-sm text-text-secondary mb-4'>
                        {results.length} job{results.length !== 1 ? 's' : ''} found
                    </p>

                    <div className='grid grid-cols-1 gap-4'>
                        {results.length > 0
                            ? results.map((item, idx) => <Card item={item} key={item._id || idx} />)
                            : !loading && (
                                <p className='text-text-secondary text-sm text-center mt-10'>
                                    No jobs found for "{search}"
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Full width footer */}
            <Footer />

        </div>
    )
}

export default BrowseJob