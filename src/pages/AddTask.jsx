import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import TaskForm from '../components/TaskForm'
import { addTaskAPI } from '../Services/apiServices'


function AddTask() {

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


    const handleSubmit = async (e) => {

        e.preventDefault()


        // Validation part

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

            // Geting logged-in user

            const loggedUser = JSON.parse(
                sessionStorage.getItem('loggedUser')
            )


            // Add user ID to task

            const taskData = {
                ...task,
                userId: loggedUser.id
            }


            // Add task

            await addTaskAPI(taskData)


            Swal.fire({
                title: 'Task Added',
                text: 'Task has been created successfully',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            })


            navigate('/tasks')


        } catch (error) {

            console.log(error)

            Swal.fire(
                'Error',
                'Unable to add task',
                'error'
            )

        }

    }


    return (

        <div className="max-w-4xl mx-auto px-6 py-10">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Add New Task
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Create a new task and assign its deadline.
                </p>

            </div>


            <TaskForm
                task={task}
                setTask={setTask}
                handleSubmit={handleSubmit}
                buttonText="Add Task"
            />


        </div>

    )

}

export default AddTask