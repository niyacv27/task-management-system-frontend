import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTasks, FaBars, FaTimes } from 'react-icons/fa'
import Swal from 'sweetalert2'
import ThemeButton from './ThemeButton'

function Header({ theme, toggleTheme }) {

    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false)

    const user = JSON.parse(
        sessionStorage.getItem('loggedUser')
    )


    const handleLogout = () => {

        sessionStorage.removeItem('loggedUser')

        Swal.fire({
            title: 'Logged Out',
            text: 'You have been logged out successfully',
            icon: 'success',
            timer: 1200,
            showConfirmButton: false
        })

        navigate('/')
    }


    return (

        <header className="bg-white dark:bg-gray-800 shadow-md">

            <div className="max-w-7xl mx-auto px-4">


                <div className="flex items-center justify-between h-16">


                    <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">

                        <FaTasks className="text-blue-600 text-xl" />

                        <span className="text-xl font-bold text-gray-800 dark:text-white">
                            TaskManager
                        </span>

                    </Link>
                    
                    {/* desktop navigations  */}

                    <nav className="hidden md:flex items-center gap-6">

                        <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                            Dashboard
                        </Link>

                        <Link to="/tasks" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                            Tasks
                        </Link>

                        <Link to="/calendar" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                            Calendar
                        </Link>

                        <Link to="/reports" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                            Reports
                        </Link>

                    </nav>


                    <div className="flex items-center gap-3">

                        <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-200">
                            Hi, {user?.name}
                        </span>

                        <div className="hidden sm:block">

                            <ThemeButton theme={theme} toggleTheme={toggleTheme}/>

                        </div>


                    
                        <button onClick={handleLogout} className="hidden sm:block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                            Logout
                        </button>


                        {/* responsive mobile hamburger */}

                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl text-gray-700 dark:text-white">

                            {menuOpen ? <FaTimes /> : <FaBars />}

                        </button>

                    </div>

                </div>


                {/* Mobile Menu */}

                {menuOpen && (

                    <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">

                        <div className="flex flex-col gap-3">


                            <div className="text-center text-sm text-gray-600 dark:text-gray-300 pb-2">
                                Hi, {user?.name}
                            </div>


                            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-center py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                                Dashboard
                            </Link>


                            <Link to="/tasks" onClick={() => setMenuOpen(false)} className="text-center py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                                Tasks
                            </Link>


                            <Link to="/calendar" onClick={() => setMenuOpen(false)} className="text-center py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                                Calendar
                            </Link>



                            <Link to="/reports" onClick={() => setMenuOpen(false)} className="text-center py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                                Reports
                            </Link>


                            <div className="flex justify-center py-2">

                                <ThemeButton theme={theme} toggleTheme={toggleTheme}/>

                            </div>

                            <button
                                onClick={() => {
                                    setMenuOpen(false)
                                    handleLogout()
                                }}
                                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm">
                                Logout
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </header>

    )

}

export default Header