import React, { useEffect, useState } from 'react'
import { FaFilePdf, FaCalendarAlt, FaUser } from 'react-icons/fa'

import { getAllTasksAPI } from '../Services/apiServices'
import PDFReport from '../components/PDFReport'


function Reports() {


    const [tasks, setTasks] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState('')


    useEffect(() => {

        fetchTasks()

    }, [])


    const fetchTasks = async () => {

        try {

            setLoading(true)

            setError('')


            const response = await getAllTasksAPI()


            const loggedUser =
                JSON.parse(
                    sessionStorage.getItem('loggedUser')
                )


            if (!loggedUser) {

                setTasks([])

                return

            }


            // Show only the logged-in user's tasks

            const userTasks = response.data.filter(task => String(task.userId) === String(loggedUser.id))


            setTasks(userTasks)


        } catch (error) {

            console.log(error)

            setError(
                'Unable to load task reports.'
            )

        } finally {

            setLoading(false)

        }

    }


    const getStatusClass = (status) => {

        if (status === 'Completed') {

            return 'bg-green-100 text-green-700'

        }

        if (status === 'In Progress') {

            return 'bg-blue-100 text-blue-700'

        }

        return 'bg-yellow-100 text-yellow-700'

    }


    const getPriorityClass = (priority) => {

        if (priority === 'High') {

            return 'bg-red-100 text-red-700'

        }

        if (priority === 'Medium') {

            return 'bg-yellow-100 text-yellow-700'

        }

        return 'bg-green-100 text-green-700'

    }


    return (

        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="mb-8">

                <div className="flex items-center gap-3">

                    <FaFilePdf className="text-purple-600 text-3xl" />

                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">

                        Task Reports

                    </h1>

                </div>


                <p className="text-gray-600 dark:text-gray-300 mt-2">

                    Generate and download PDF reports for your tasks.

                </p>

            </div>


            {loading && (

                <div className="text-center py-16">

                    <p className="text-gray-500 dark:text-gray-400">

                        Loading reports...

                    </p>

                </div>

            )}



            {!loading && error && (

                <div className="bg-red-100 text-red-700 p-4 rounded-lg">

                    {error}

                </div>

            )}



            {!loading && !error && tasks.length === 0 && (

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-10 text-center">

                    <FaFilePdf className="mx-auto text-gray-400 text-4xl mb-4" />

                    <h2 className="text-xl font-semibold text-gray-700 dark:text-white">

                        No Reports Available

                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mt-2">

                        Create a task first to generate a task report.

                    </p>

                </div>

            )}


            {/* Reports section */}

            {!loading && !error && tasks.length > 0 && (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                    {tasks.map((task) => (

                        <div
                            key={task.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-6">



                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">

                                {task.title}

                            </h2>


                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-5">

                                {task.description}

                            </p>


                            <div className="mb-3">

                                <span className="text-sm text-gray-500 dark:text-gray-400">

                                    Priority:

                                </span>

                                <span className={`ml-2 text-xs font-semibold px-3 py-1 rounded-full ${getPriorityClass(task.priority)}`}>

                                    {task.priority}

                                </span>

                            </div>


                            <div className="mb-3">

                                <span className="text-sm text-gray-500 dark:text-gray-400">

                                    Status:

                                </span>

                                <span className={`ml-2 text-xs font-semibold px-3 py-1 rounded-full ${getStatusClass(task.status)}`}>

                                    {task.status}

                                </span>

                            </div>


                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">

                                <FaCalendarAlt />

                                <span>
                                    {task.deadline}
                                </span>

                            </div>


                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-5">

                                <FaUser />

                                <span>
                                    {task.assignedPerson}
                                </span>

                            </div>


                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">

                                Category: {task.category}

                            </p>


                            {/* PDF Button */}

                            <PDFReport task={task} />


                        </div>

                    ))}


                </div>

            )}


        </div>

    )

}


export default Reports