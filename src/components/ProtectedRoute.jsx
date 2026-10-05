import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {

    const user = sessionStorage.getItem('loggedUser')


    if (!user) {

        return <Navigate to="/login" replace />

    }


    return children
}

export default ProtectedRoute