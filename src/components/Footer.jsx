import React from 'react'
import { FaTasks } from 'react-icons/fa'

function Footer() {

    return (

        <footer className="bg-gray-200 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">

            <div className="max-w-7xl mx-auto px-8 py-7">


                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    <div className="flex items-center gap-2">

                        <FaTasks className="text-purple-600 text-2xl" />

                        <span className="text-2xl font-bold text-gray-800 dark:text-white">
                            TaskMate
                        </span>

                    </div>



                    <div className="flex flex-wrap justify-center items-center gap-8">

                        <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition">
                            About
                        </a>

                        <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition">
                            Privacy Policy
                        </a>

                        <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition">
                            Licensing
                        </a>

                        <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition">
                            Contact
                        </a>

                    </div>

                </div>

                {/* divide for footer styling */}
                <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>



                <div className="text-center">

                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        © 2026 TaskMate™
                    </p>

                </div>

            </div>

        </footer>

    )

}

export default Footer