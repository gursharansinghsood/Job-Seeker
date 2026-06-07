import { Navigate } from 'react-router-dom'

export const PrivateRoutes = ({ children, allowedRole }) => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) return <Navigate to="/" replace />

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to={
            user.role === "student" ? "/student/dashboard" : "/recruiter/dashboard"
        } replace />
    }

    return children
}