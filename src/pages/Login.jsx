import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginAPI } from '../Services/apiServices'
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'


function Login({ theme, toggleTheme }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()


    const handleLogin = async (e) => {

        e.preventDefault()


        if (!email || !password) {

            Swal.fire(
                'Error',
                'Please enter email and password',
                'error'
            )

            return
        }


        try {

            const response = await loginAPI(email)

            const users = response.data


            if (users.length === 0) {

                Swal.fire(
                    'Login Failed',
                    'Email is not registered',
                    'error'
                )

                return
            }


            const user = users[0]


            if (user.password !== password) {

                Swal.fire(
                    'Login Failed',
                    'Incorrect password',
                    'error'
                )

                return
            }


            // Save logged-in user

            sessionStorage.setItem(
                'loggedUser',
                JSON.stringify(user)
            )


            Swal.fire({
                title: 'Login Successful',
                text: `Welcome ${user.name}`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            })


            navigate('/dashboard')


        } catch (error) {

            console.log(error)

            Swal.fire(
                'Error',
                'Unable to login. Please try again.',
                'error'
            )

        }

    }


    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">

            <PublicHeader theme={theme} toggleTheme={toggleTheme}/>

            <div className="flex-grow flex items-center justify-center px-4 py-12">

                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">


                    {/* Heading  part*/}

                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">

                        Welcome Back

                    </h1>


                    <p className="text-center text-gray-500 dark:text-gray-400 mb-7">

                        Login to manage your tasks

                    </p>


                    {/* Login Form */}

                    <form onSubmit={handleLogin}>



                        <div className="mb-5">

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



                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                                Password

                            </label>


                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                            />

                        </div>


                       

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition">

                            Login

                        </button>


                    </form>



                    <p className="text-center text-gray-600 dark:text-gray-300 mt-6">

                        Don't have an account?

                        <Link to="/register" className="text-purple-600 dark:text-purple-400 font-medium ml-1">

                            Register

                        </Link>

                    </p>


                </div>

            </div>



            <Footer />

        </div>

    )

}


export default Login