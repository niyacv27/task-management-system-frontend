import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { registerAPI, loginAPI } from '../Services/apiServices'

import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'


function Register({ theme, toggleTheme }) {

    const [name, setName] = useState('')

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')


    const navigate = useNavigate()


    const handleRegister = async (e) => {

        e.preventDefault()


        // Basic validation part

        if (!name || !email || !password || !confirmPassword) {

            Swal.fire(
                'Error',
                'Please fill all fields',
                'error'
            )

            return
        }


        // Email validation

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailPattern.test(email)) {

            Swal.fire(
                'Invalid Email',
                'Please enter a valid email address',
                'error'
            )

            return
        }


        // Password validation

        if (password.length < 6) {

            Swal.fire(
                'Invalid Password',
                'Password must contain at least 6 characters',
                'error'
            )

            return
        }


        // Confirm password

        if (password !== confirmPassword) {

            Swal.fire(
                'Password Error',
                'Passwords do not match',
                'error'
            )

            return
        }


        try {

            // Check whether email already exists

            const existingUser = await loginAPI(email)


            if (existingUser.data.length > 0) {

                Swal.fire(
                    'Already Registered',
                    'This email is already registered',
                    'warning'
                )

                return
            }


            // Creating user

            const newUser = {

                name: name,
                email: email,
                password: password

            }


            await registerAPI(newUser)


            Swal.fire(
                'Success',
                'Registration completed successfully',
                'success'
            )


            navigate('/login')


        } catch (error) {

            console.log(error)

            Swal.fire(
                'Error',
                'Something went wrong. Please try again.',
                'error'
            )

        }

    }


    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">


            <PublicHeader theme={theme} toggleTheme={toggleTheme}/>


            <div className="flex-grow flex items-center justify-center px-4 py-12">

                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">


                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">

                        Create Account

                    </h1>


                    <p className="text-center text-gray-500 dark:text-gray-400 mb-7">

                        Create your task manager account

                    </p>


                    <form onSubmit={handleRegister}>


                        <div className="mb-4">

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                                Name

                            </label>


                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                            />

                        </div>


                        <div className="mb-4">

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                                Email

                            </label>


                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                            />

                        </div>



                        <div className="mb-4">

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                                Password

                            </label>


                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                            />

                        </div>


                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                                Confirm Password

                            </label>


                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                            />

                        </div>



                        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition">

                            Register

                        </button>


                    </form>


                    <p className="text-center text-gray-600 dark:text-gray-300 mt-6">

                        Already have an account?

                        <Link to="/login" className="text-purple-600 dark:text-purple-400 font-medium ml-1">

                            Login

                        </Link>

                    </p>


                </div>

            </div>


            <Footer />

        </div>

    )

}


export default Register