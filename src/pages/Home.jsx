import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    FaTasks,
    FaCalendarAlt,
    FaChartLine,
    FaFilePdf
} from 'react-icons/fa'

import AOS from 'aos'
import 'aos/dist/aos.css'

import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'


function Home({ theme, toggleTheme }) {


    // Initializing AOS

    useEffect(() => {

        AOS.init({
            duration: 800,
            once: true
        })

    }, [])


    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">


            <PublicHeader theme={theme} toggleTheme={toggleTheme}/>


            <section data-aos="fade-up"
                className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white">

                <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

                    <div className="max-w-3xl">


                       

                        <div
                            data-aos="fade-right"
                            data-aos-delay="200"
                            className="flex items-center gap-3 mb-5">

                            <FaTasks className="text-4xl" />

                            <span className="text-2xl font-semibold">

                                TaskMate

                            </span>

                        </div>


                        {/* Heading part */}

                        <h1
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="text-4xl md:text-6xl font-bold leading-tight">

                            Manage Your Tasks.
                            <br />

                            Stay Organized.

                        </h1>


                        {/* Description */}

                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="text-purple-100 dark:text-gray-300 text-lg md:text-xl mt-6 max-w-2xl">

                            TaskMate helps you manage tasks, track deadlines,
                            monitor progress and stay organized in one simple place.

                        </p>


                        {/* Buttons */}

                        <div
                            data-aos="fade-up"
                            data-aos-delay="500"
                            className="flex flex-wrap gap-4 mt-8">

                            <Link to="/register"
                                className="bg-white text-purple-700 hover:bg-gray-100 px-7 py-3 rounded-lg font-semibold transition">
                                Get Started
                            </Link>


                            <Link to="/login"
                                className="border border-white hover:bg-white hover:text-purple-700 px-7 py-3 rounded-lg font-semibold transition">
                                Login
                            </Link>

                        </div>


                    </div>

                </div>

            </section>


            {/* Features */}

            <section className="max-w-7xl mx-auto px-6 py-16 flex-grow">


                {/* Features Heading */}

                <div data-aos="fade-up" className="text-center mb-12">

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">

                        Everything You Need to Manage Tasks

                    </h2>


                    <p className="text-gray-500 dark:text-gray-400 mt-3">

                        Simple tools to organize and track your daily work.

                    </p>

                </div>


                {/* Feature Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


                    {/* Task Management */}

                    <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-7 hover:shadow-xl transition">

                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-5">

                            <FaTasks />

                        </div>


                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">

                            Manage Tasks

                        </h3>


                        <p className="text-gray-500 dark:text-gray-400">

                            Create, update, view and delete your tasks easily.

                        </p>

                    </div>


                    {/* Calendar */}

                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-7 hover:shadow-xl transition">

                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-5">

                            <FaCalendarAlt />

                        </div>


                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">

                            Track Deadlines

                        </h3>


                        <p className="text-gray-500 dark:text-gray-400">

                            View your deadlines using an easy task calendar.

                        </p>

                    </div>


                    {/* Dashboard */}

                    <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-7 hover:shadow-xl transition">

                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 text-green-600 rounded-xl flex items-center justify-center text-xl mb-5">

                            <FaChartLine />

                        </div>


                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">

                            Track Progress

                        </h3>


                        <p className="text-gray-500 dark:text-gray-400">

                            Monitor task status and priorities using charts.

                        </p>

                    </div>


                    {/* PDF */}

                    <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-7 hover:shadow-xl transition">

                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 text-red-600 rounded-xl flex items-center justify-center text-xl mb-5">

                            <FaFilePdf />

                        </div>


                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">

                            Task Reports

                        </h3>


                        <p className="text-gray-500 dark:text-gray-400">

                            Generate and download individual task reports as PDF.

                        </p>

                    </div>


                </div>


                <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="mt-16 bg-purple-50 dark:bg-gray-800 rounded-2xl p-10 text-center">

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">

                        Ready to organize your tasks?

                    </h2>


                    <p className="text-gray-500 dark:text-gray-400 mt-3">

                        Create your TaskMate account and get started today.

                    </p>


                    <Link
                        to="/register"
                        className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-lg font-semibold transition">

                        Create Account

                    </Link>

                </div>


            </section>



            <Footer />


        </div>

    )

}


export default Home