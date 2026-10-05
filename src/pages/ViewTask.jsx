import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'

import { getSingleTaskAPI } from '../Services/apiServices'


function ViewTask() {


    const { id } = useParams()


    const [task, setTask] = useState(null)

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState('')


    const getTask = async () => {

        try {

            setLoading(true)

            const response = await getSingleTaskAPI(id)


            const loggedUser = JSON.parse(
                sessionStorage.getItem('loggedUser')
            )


            // Checking whether task belongs to current user

            if (
                String(response.data.userId) !==
                String(loggedUser.id)
            ) {

                setError('You are not allowed to view this task')

                return
            }


            setTask(response.data)


        } catch (error) {

            console.log(error)

            setError('Unable to load task')

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {

        getTask()

    }, [id])


    if (loading) {

        return (

            <div className="max-w-4xl mx-auto px-6 py-20 text-center">

                Loading task...

            </div>

        )

    }


    if (error) {

        return (

            <div className="max-w-4xl mx-auto px-6 py-20 text-center text-red-500">

                {error}

            </div>

        )

    }


    if (!task) {

        return (

            <div className="max-w-4xl mx-auto px-6 py-20 text-center">

                Task not found.

            </div>

        )

    }


    return (

        <div className="max-w-4xl mx-auto px-6 py-10">


            <div className="flex justify-between items-center mb-8">


                <Link to="/tasks" className="flex items-center gap-2 text-blue-600">

                    <FaArrowLeft />

                    Back to Tasks

                </Link>


                <Link to={`/tasks/edit/${task.id}`} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">

                    <FaEdit />

                    Edit Task

                </Link>


            </div>


            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8">


                <h1 className="text-3xl font-bold mb-4">
                    {task.title}
                </h1>


                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {task.description}
                </p>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                    <div>

                        <p className="text-sm text-gray-500">
                            Priority
                        </p>

                        <p className="font-semibold mt-1">
                            {task.priority}
                        </p>

                    </div>


                    <div>

                        <p className="text-sm text-gray-500">
                            Status
                        </p>

                        <p className="font-semibold mt-1">
                            {task.status}
                        </p>

                    </div>


                    <div>

                        <p className="text-sm text-gray-500">
                            Deadline
                        </p>

                        <p className="font-semibold mt-1">
                            {task.deadline}
                        </p>

                    </div>


                    <div>

                        <p className="text-sm text-gray-500">
                            Category
                        </p>

                        <p className="font-semibold mt-1">
                            {task.category}
                        </p>

                    </div>


                    <div>

                        <p className="text-sm text-gray-500">
                            Assigned Person
                        </p>

                        <p className="font-semibold mt-1">
                            {task.assignedPerson}
                        </p>

                    </div>


                </div>


            </div>

            


        </div>

    )

}

export default ViewTask