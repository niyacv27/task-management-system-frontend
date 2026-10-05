import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTasks, FaBars, FaTimes } from 'react-icons/fa'
import ThemeButton from './ThemeButton'

function PublicHeader({ theme, toggleTheme }) {

    const [menuOpen, setMenuOpen] = useState(false)


    return (

        <header className="bg-white dark:bg-gray-800 shadow-md">

            <div className="max-w-7xl mx-auto px-6">


                <div className="flex items-center justify-between h-16">


                    <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>

                        <FaTasks className="text-purple-600 text-xl" />

                        <span className="text-xl font-bold text-gray-800 dark:text-white">
                            TaskMate
                        </span>

                    </Link>

                    {/* desktop menue section */}

                    <div className="hidden md:flex items-center gap-3">

                        <ThemeButton theme={theme} toggleTheme={toggleTheme} />

                        <Link to="/login" className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                            Login
                        </Link>

                        <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                            Sign Up
                        </Link>

                    </div>


                    {/* Mobile Hamburger */}

                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 dark:text-white text-2xl">

                        {menuOpen ? <FaTimes /> : <FaBars />}

                    </button>

                </div>


                {/* Mobile Menu */}

                {menuOpen && (

                    <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">

                        <div className="flex flex-col gap-3">


                            <div className="flex justify-center">

                                <ThemeButton theme={theme} toggleTheme={toggleTheme} />

                            </div>


                            <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full text-center border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                Login
                            </Link>


                            <Link to="/register" onClick={() => setMenuOpen(false)} className="w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                Sign Up
                            </Link>

                        </div>

                    </div>

                )}

            </div>

        </header>

    )

}

export default PublicHeader