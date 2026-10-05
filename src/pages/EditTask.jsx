import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import TaskForm from '../components/TaskForm'

import {
    getSingleTaskAPI,
    updateTaskAPI
} from '../Services/apiServices'


function EditTask() {


    const { id } = useParams()

    const navigate = useNavigate()


    const [task, setTask] = useState({

        title: '',
        description: '',
        priority: '',
        status: '',
        deadline: '',
        category: '',
        assignedPerson: ''

    })


    const [loading, setLoading] = useState(true)


    // Get existing task

    const getTask = async () => {

    try {

        const response = await getSingleTaskAPI(id)


        const loggedUser = JSON.parse(
            sessionStorage.getItem('loggedUser')
        )


        // Check task ownership

        if (
            String(response.data.userId) !==
            String(loggedUser.id)
        ) {

            Swal.fire(
                'Access Denied',
                'You cannot edit this task',
                'error'
            )

            navigate('/tasks')

            return
        }


        setTask(response.data)


    } catch (error) {

        console.log(error)

        Swal.fire(
            'Error',
            'Unable to load task',
            'error'
        )

    } finally {

        setLoading(false)

    }
}

    useEffect(() => {

        getTask()

    }, [id])


    // Update task

    const handleSubmit = async (e) => {

        e.preventDefault()


        if (
            !task.title ||
            !task.description ||
            !task.priority ||
            !task.status ||
            !task.deadline ||
            !task.category ||
            !task.assignedPerson
        ) {

            Swal.fire(
                'Missing Information',
                'Please fill all fields',
                'warning'
            )

            return

        }


        try {

            await updateTaskAPI(id, task)


            Swal.fire({

                title: 'Task Updated',
                text: 'Task has been updated successfully',
                icon: 'success',

                timer: 1500,

                showConfirmButton: false

            })


            navigate(`/tasks/${id}`)


        } catch (error) {

            console.log(error)

            Swal.fire(
                'Error',
                'Unable to update task',
                'error'
            )

        }

    }


    if (loading) {

        return (

            <div className="text-center py-20">

                Loading task...

            </div>

        )

    }


    return (

        <div className="max-w-4xl mx-auto px-6 py-10">


            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Edit Task
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Update your task information.
                </p>

            </div>


            <TaskForm
                task={task}
                setTask={setTask}
                handleSubmit={handleSubmit}
                buttonText="Update Task"
            />


        </div>

    )

}

export default EditTask