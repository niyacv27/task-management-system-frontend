import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-6">

            <div className="text-center">

                <h1 className="text-7xl font-bold text-purple-600">
                    404
                </h1>

                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
                    Page Not Found
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-3">
                    Sorry, the page you are looking for does not exist.
                </p>

                <Link to="/"
                    className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition">
                    Go to Home
                </Link>

            </div>

        </div>
    )
}

export default NotFound