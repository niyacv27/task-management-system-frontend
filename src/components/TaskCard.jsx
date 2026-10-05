import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaCalendarAlt,
    FaUser,
    FaEdit,
    FaEye,
    FaTrash
} from 'react-icons/fa'


function TaskCard({ task, handleDelete }) {


    const getPriorityClass = () => {

        if (task.priority === 'High') {
            return 'bg-red-100 text-red-700'
        }

        if (task.priority === 'Medium') {
            return 'bg-yellow-100 text-yellow-700'
        }

        return 'bg-green-100 text-green-700'
    }


    const getStatusClass = () => {

        if (task.status === 'Completed') {
            return 'bg-green-100 text-green-700'
        }

        if (task.status === 'In Progress') {
            return 'bg-blue-100 text-blue-700'
        }

        return 'bg-yellow-100 text-yellow-700'
    }


    return (

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-5">



            <div className="flex justify-between items-start gap-3">

                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {task.title}
                </h2>


                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getPriorityClass()}`}>
                    {task.priority}
                </span>

            </div>


            <p className="text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">
                {task.description}
            </p>


            <div className="mt-4">

                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusClass()}`}>
                    {task.status}
                </span>

            </div>


            {/* Information section */}

            <div className="mt-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">


                {/* Deadline section */}

                <div className="flex items-center gap-2">

                    <FaCalendarAlt />

                    <span>
                        {task.deadline}
                    </span>

                </div>


                {/* Assigned Person section */}

                <div className="flex items-center gap-2">

                    <FaUser />

                    <span>
                        {task.assignedPerson}
                    </span>

                </div>



                <p>
                    Category: {task.category}
                </p>


            </div>


            {/* Buttons section */}

            <div className="flex flex-wrap gap-2 mt-6">


                <Link to={`/tasks/${task.id}`} className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-xs transition">

                    <FaEye />

                    View

                </Link>


                <Link to={`/tasks/edit/${task.id}`} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-xs transition">

                    <FaEdit />

                    Edit

                </Link>


                <button onClick={() => handleDelete(task.id)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-xs transition">

                    <FaTrash />

                    Delete

                </button>


            </div>


        </div>

    )

}


export default TaskCard