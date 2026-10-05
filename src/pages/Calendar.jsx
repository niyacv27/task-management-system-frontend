import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { getAllTasksAPI } from '../Services/apiServices'


function CalendarPage() {

    const [tasks, setTasks] = useState([])

    const [selectedDate, setSelectedDate] = useState(new Date())

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState('')


    // Get current user's tasks

    const getTasks = async () => {

        try {

            setLoading(true)

            const response = await getAllTasksAPI()

            const loggedUser = JSON.parse(
                sessionStorage.getItem('loggedUser')
            )


            // Only getting current user's tasks

            const userTasks = response.data.filter(
                task =>
                    String(task.userId) ===
                    String(loggedUser.id)
            )


            setTasks(userTasks)


        } catch (error) {

            console.log(error)

            setError('Unable to load calendar tasks')

        } finally {

            setLoading(false)

        }

    }


    useEffect(() => {

        getTasks()

    }, [])


    // Convert date into year-month-date

    const formatDate = (date) => {

        const year = date.getFullYear()

        const month = String(
            date.getMonth() + 1
        ).padStart(2, '0')

        const day = String(
            date.getDate()
        ).padStart(2, '0')

        return `${year}-${month}-${day}`

    }


    // Get tasks for a particular date

    const getTasksForDate = (date) => {

        const dateString = formatDate(date)

        return tasks.filter(
            task => task.deadline === dateString
        )

    }


    // Showing task indicators on calendar

    const getDateIndicators = (date) => {

        const dateTasks = getTasksForDate(date)


        if (dateTasks.length === 0) {
            return null
        }


        return (

            <div className="flex justify-center gap-1 mt-1">

                {dateTasks.some(
                    task => task.status === 'Pending'
                ) && (
                    <span className="calendar-dot pending-dot"></span>
                )}


                {dateTasks.some(
                    task => task.status === 'In Progress'
                ) && (
                    <span className="calendar-dot progress-dot"></span>
                )}


                {dateTasks.some(
                    task => task.status === 'Completed'
                ) && (
                    <span className="calendar-dot completed-dot"></span>
                )}

            </div>

        )

    }


    

    const selectedDateString =
        formatDate(selectedDate)


    // Tasks for selected date

    const selectedTasks =
        getTasksForDate(selectedDate)


    if (loading) {

        return (

            <div className="text-center py-20">

                <p className="text-lg">
                    Loading calendar...
                </p>

            </div>

        )

    }


    if (error) {

        return (

            <div className="text-center py-20">

                <p className="text-red-500 text-lg">
                    {error}
                </p>

            </div>

        )

    }


    return (

        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">

                    Task Calendar

                </h1>

                <p className="text-gray-600 dark:text-gray-300 mt-2">

                    View your tasks based on their deadlines.

                </p>

            </div>



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                {/* Calendar section */}

                <div className="calendar-container bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-5">

                        Deadlines

                    </h2>


                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}

                        tileContent={({ date, view }) => {

                            if (view === 'month') {

                                return getDateIndicators(date)

                            }

                            return null

                        }}

                    />


                    <div className="flex flex-wrap gap-5 mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">

                        <div className="flex items-center gap-2">

                            <span className="calendar-dot pending-dot"></span>

                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                Pending
                            </span>

                        </div>


                        <div className="flex items-center gap-2">

                            <span className="calendar-dot progress-dot"></span>

                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                In Progress
                            </span>

                        </div>


                        <div className="flex items-center gap-2">

                            <span className="calendar-dot completed-dot"></span>

                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                Completed
                            </span>

                        </div>

                    </div>

                </div>


                {/* Selected date tasks */}

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Selected Date
                            </p>

                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                                {selectedDateString}
                            </h2>

                        </div>


                        <div className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg">

                            {selectedTasks.length}
                            {' '}
                            {selectedTasks.length === 1 ? 'Task' : 'Tasks'}

                        </div>

                    </div>


                    {selectedTasks.length === 0 ? (

                        <div className="text-center py-16 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl">

                            <div className="text-4xl mb-3">
                                📅
                            </div>

                            <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                                No tasks for this date
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                Select another date to view your deadlines.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {selectedTasks.map(task => (

                                <div
                                    key={task.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition"
                                >

                                    <div className="flex justify-between items-start gap-4">

                                        <div>

                                            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">

                                                {task.title}

                                            </h3>

                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">

                                                {task.description}

                                            </p>

                                        </div>


                                        {/* Status section */}

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
                                                ${
                                                    task.status === 'Pending'
                                                        ? 'bg-orange-300 text-orange-700'
                                                        : task.status === 'In Progress'
                                                        ? 'bg-blue-300 text-blue-700'
                                                        : 'bg-green-300 text-green-700'
                                                }
                                            `}
                                        >

                                            {task.status}

                                        </span>

                                    </div>


                                    

                                    <div className="flex flex-wrap gap-2 mt-4">

                                        <span className="bg-purple-300 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">

                                            {task.priority}

                                        </span>


                                        <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">

                                            {task.category}

                                        </span>


                                        <span className="bg-amber-300 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">

                                            👤 {task.assignedPerson}

                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


            </div>

        </div>

    )

}


export default CalendarPage