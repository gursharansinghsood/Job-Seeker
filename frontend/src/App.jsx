import React from 'react'
import Login from './Pages/auth/Login'
import Signup from './Pages/auth/Signup'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from './routes/PrivateRoutes'
import StudentDashboard from './Pages/student/StudentDashboard'
import RecruiterDashboard from './Pages/recruiter/RecruiterDashboard'
import BrowseJob from './Pages/student/BrowseJob'
import JobDetail from './Pages/student/JobDetail'
import StudentProfile from './Pages/student/Profile'
import AppliedJob from './Pages/student/AppliedJob'
import SavedJob from './Pages/student/SavedJob'
import StudentNotifications from './Pages/student/Notifications'
import PostJob from './Pages/recruiter/PostJob'
import MyJobs from './Pages/recruiter/MyJobs'
import Applications from './Pages/recruiter/Applications'
import RecruiterNotifications from './Pages/recruiter/Notifications'
import RecruiterProfile from './Pages/recruiter/Profile'
import AllApplications from './Pages/recruiter/AllApplications'


const App = () => {
  return (
    <div className='w-full min-h-screen'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Student Routes */}
        <Route path='/student/dashboard' element={
          <PrivateRoutes allowedRole="student">
            <StudentDashboard />
          </PrivateRoutes>
        } />
        <Route path='/student/browsejob' element={
          <PrivateRoutes allowedRole="student">
            <BrowseJob />
          </PrivateRoutes>
        } />
        <Route path='/student/job/:id' element={
          <PrivateRoutes allowedRole="student">
            <JobDetail />
          </PrivateRoutes>
        } />
        <Route path='/student/appliedjob' element={
          <PrivateRoutes allowedRole="student">
            <AppliedJob />
          </PrivateRoutes>
        } />
        <Route path='/student/savedjob' element={
          <PrivateRoutes allowedRole="student">
            <SavedJob />
          </PrivateRoutes>
        } />
        <Route path='/student/profile' element={
          <PrivateRoutes allowedRole="student">
            <StudentProfile />
          </PrivateRoutes>
        } />
        <Route path='/student/notifications' element={
          <PrivateRoutes allowedRole="student">
            <StudentNotifications />
          </PrivateRoutes>
        } />

        {/* Recruiter Routes */}
        <Route path='/recruiter/dashboard' element={
          <PrivateRoutes allowedRole="recruiter">
            <RecruiterDashboard />
          </PrivateRoutes>
        } />
        <Route path='/recruiter/postjob' element={
          <PrivateRoutes allowedRole="recruiter">
            <PostJob />
          </PrivateRoutes>
        } />
        <Route path='/recruiter/myjobs' element={
          <PrivateRoutes allowedRole="recruiter">
            <MyJobs />
          </PrivateRoutes>
        } />
        <Route path='/recruiter/applications/:postId' element={
          <PrivateRoutes allowedRole="recruiter">
            <Applications />
          </PrivateRoutes>
        } />
        <Route path='/recruiter/applications' element={
          <PrivateRoutes allowedRole="recruiter">
            <AllApplications />
          </PrivateRoutes>
        } />
        <Route path='/recruiter/notifications' element={
          <PrivateRoutes allowedRole="recruiter">
            <RecruiterNotifications />
          </PrivateRoutes>
        } />
        <Route path='/recruiter/profile' element={
          <PrivateRoutes allowedRole="recruiter">
            <RecruiterProfile />
          </PrivateRoutes>
        } />

        {/* 404 */}
        <Route path='*' element={
          <div className='flex flex-col h-screen justify-center items-center text-text-primary'>
            <p className='text-6xl font-bold'>404</p>
            <p className='text-text-secondary mt-2'>Page not found</p>
            <a href='/' className='mt-5 text-sm text-primary-hover hover:underline'>
              Go back to Home
            </a>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App
