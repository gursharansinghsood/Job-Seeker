import React from 'react'
import SideBar from '../../components/SideBar'
import NavBar from '../../components/NavBar'
import Card from '../../components/Card'
import { MiniCard } from '../../components/MiniCard'
import { Link } from 'react-router-dom'
import useAxios from '../../service/CustomHook'
import Footer from '../../components/Footer'

const StudentDashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  const { data, loading }        = useAxios('/recruiter/posts')
  const { data: appliedData }    = useAxios(`/applied/${user?._id}`)
  const { data: savedData }      = useAxios(`/saved/${user?._id}`)

  const miniCardArray = [
    { 
        number: data?.posts?.length ?? '...', 
        text: "Total Jobs",    
        color: "text-primary"  
    },
    { 
        number: appliedData?.appliedJobs?.length ?? '...', 
        text: "Applied Jobs",  
        color: "text-success"  
    },
    { 
        number: savedData?.savedJobs?.length ?? '...', 
        text: "Saved Jobs",    
        color: "text-warning"  
    },
    { 
        number: appliedData?.appliedJobs?.filter(j => j.status === 'shortlisted').length ?? '...', 
        text: "Shortlist",     
        color: "text-danger"   
    }
  ]

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
          <p className='text-xl font-medium mb-2'>Welcome, {user.name} 👋</p>
          <p className='text-sm text-text-secondary mb-5'>
            Here's what's happening with your job search
          </p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
            {miniCardArray.map((item, idx) => (
              <MiniCard item={item} key={idx} />
            ))}
          </div>

          <div className='mt-10 flex justify-between items-center'>
            <p className='text-lg font-medium'>Recommended Jobs</p>
            <Link to='/student/browsejob' className='text-sm text-primary-hover'>
              View All
            </Link>
          </div>

          <div className='grid grid-cols-1 gap-5 mt-5'>
            {data?.posts?.slice(0, 4).map((item, idx) => (
              <Card item={item} key={item._id || idx} />
            ))}
          </div>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default StudentDashboard