import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'

import TaskCard from '../components/TaskCard'

import {
    getAllTasksAPI,
    deleteTaskAPI
} from '../Services/apiServices'


function Tasks() {

    // TASK STATE
    

    const [tasks, setTasks] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState('')


    
    // SEARCH & FILTER STATE

    const [search, setSearch] = useState('')

    const [priority, setPriority] = useState('')

    const [status, setStatus] = useState('')

    const [category, setCategory] = useState('')


    
    // PAGINATION STATE
    
    const [currentPage, setCurrentPage] = useState(Number(sessionStorage.getItem('currentPage')) || 1)

    const [recordsPerPage, setRecordsPerPage] = useState(Number(sessionStorage.getItem('recordsPerPage')) || 6)


    // GET TASKS


   const getTasks = async () => {

    try {

        setLoading(true)
        setError('')


        // Get logged-in user

        const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'))


        // Get all tasks

        const response = await getAllTasksAPI()


        // Show only current user's tasks

        const userTasks = response.data.filter(task => String(task.userId) === String(loggedUser.id))


        setTasks(userTasks)


    } catch (error) {

        console.log(error)

        setError('Unable to load tasks')

    } finally {

        setLoading(false)

    }
}

    useEffect(() => {

        getTasks()

    }, [])


    
    // FILTER TASKS
  

    const filteredTasks = tasks.filter((task) => {

        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(search.toLowerCase())


        const matchesPriority = priority === '' || task.priority === priority


        const matchesStatus = status === '' || task.status === status


        const matchesCategory = category === '' || task.category === category


        return (
            matchesSearch &&
            matchesPriority &&
            matchesStatus &&
            matchesCategory
        )

    })


    
    // PAGINATION
    

    const totalPages = Math.ceil(filteredTasks.length / recordsPerPage)


    const startIndex = (currentPage - 1) * recordsPerPage


    const endIndex = startIndex + recordsPerPage


    const currentTasks = filteredTasks.slice(startIndex,endIndex)

    
    // DELETE TASK
   

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: 'Delete Task?',

            text: 'This task will be permanently deleted.',

            icon: 'warning',

            showCancelButton: true,

            confirmButtonColor: '#dc2626',

            cancelButtonColor: '#6b7280',

            confirmButtonText: 'Yes, delete it'

        })


        if (!result.isConfirmed) {

            return

        }


        try {

            await deleteTaskAPI(id)


            setTasks(
                tasks.filter(
                    task => task.id !== id
                )
            )


            Swal.fire({

                title: 'Deleted',

                text: 'Task has been deleted.',

                icon: 'success',

                timer: 1200,

                showConfirmButton: false

            })


        } catch (error) {

            console.log(error)

            Swal.fire(
                'Error',
                'Unable to delete task',
                'error'
            )

        }

    }



    // CLEAR FILTERS

    const clearFilters = () => {

        setSearch('')

        setPriority('')

        setStatus('')

        setCategory('')

        setCurrentPage(1)


        sessionStorage.setItem('currentPage', 1)

    }


    
    // SEARCH CHANGE
    
    const handleSearch = (e) => {

        setSearch(e.target.value)

        setCurrentPage(1)

        // Search starts from page 1
        sessionStorage.setItem('currentPage', 1)

    }


    
    // RECORDS PER PAGE
   

    const handleRecordsChange = (e) => {

        const value = Number(e.target.value)


        setRecordsPerPage(value)


        // Saving selected records per page
        sessionStorage.setItem('recordsPerPage',value)

        setCurrentPage(1)

        sessionStorage.setItem('currentPage',1)

    }


    
    // PAGE CHANGE
    
    const changePage = (page) => {

        setCurrentPage(page)

        // Save current page
        sessionStorage.setItem('currentPage',page)

    }


    return (

        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

                <div>

                    <h1 className="text-3xl font-bold">

                        My Tasks

                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 mt-2">

                        Search and manage your tasks.

                    </p>

                </div>


                <Link
                    to="/tasks/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">

                    + Add Task

                </Link>

            </div>


            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 mb-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">



                    <div className="lg:col-span-1">

                        <label className="block text-sm font-medium mb-2">

                            Search by Title

                        </label>


                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search tasks..."
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Priority

                        </label>


                        <select
                            value={priority}
                            onChange={(e) => {

                                setPriority(e.target.value)

                                setCurrentPage(1)

                                sessionStorage.setItem(
                                    'currentPage',
                                    1
                                )

                            }}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700">

                            <option value="">

                                All Priorities

                            </option>

                            <option value="Low">

                                Low

                            </option>

                            <option value="Medium">

                                Medium

                            </option>

                            <option value="High">

                                High

                            </option>

                        </select>

                    </div>


                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Status

                        </label>


                        <select
                            value={status}
                            onChange={(e) => {

                                setStatus(e.target.value)

                                setCurrentPage(1)

                                sessionStorage.setItem(
                                    'currentPage',
                                    1
                                )

                            }}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700">

                            <option value="">

                                All Status

                            </option>

                            <option value="Pending">

                                Pending

                            </option>

                            <option value="In Progress">

                                In Progress

                            </option>

                            <option value="Completed">

                                Completed

                            </option>

                        </select>

                    </div>


                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Category

                        </label>


                        <select
                            value={category}
                            onChange={(e) => {

                                setCategory(e.target.value)

                                setCurrentPage(1)

                                sessionStorage.setItem(
                                    'currentPage',
                                    1
                                )

                            }}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700">

                            <option value="">

                                All Categories

                            </option>

                            <option value="College">

                                College

                            </option>

                            <option value="Work">

                                Work

                            </option>

                            <option value="Personal">

                                Personal

                            </option>

                            <option value="Other">

                                Other

                            </option>

                        </select>

                    </div>

                </div>


                {/* Filter buttons section */}

                <div className="flex flex-wrap items-center justify-between gap-3 mt-5">

                    <p className="text-sm text-gray-500 dark:text-gray-400">

                        Showing {filteredTasks.length} task
                        {filteredTasks.length !== 1 ? 's' : ''}

                    </p>


                    <button
                        onClick={clearFilters}
                        className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">

                        Clear Filters

                    </button>

                </div>

            </div>


           
            {/* LOADING */}


            {loading && (

                <div className="text-center py-20">

                    <p className="text-lg text-gray-500">

                        Loading tasks...

                    </p>

                </div>

            )}


            
            {/* ERROR */}

            {!loading && error && (

                <div className="text-center py-20">

                    <p className="text-red-500 text-lg">

                        {error}

                    </p>


                    <button onClick={getTasks} className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg">

                        Try Again

                    </button>

                </div>

            )}


            
            {/* NO RESULTS */}

            {!loading &&
                !error &&
                filteredTasks.length === 0 && (

                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl">

                        <h2 className="text-xl font-semibold">

                            No Tasks Found

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Try changing your search or filters.

                        </p>

                    </div>

                )}



            {/* TASK CARDS */}

            {!loading &&
                !error &&
                filteredTasks.length > 0 && (

                    <>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {currentTasks.map(task => (

                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    handleDelete={handleDelete}
                                />

                            ))}

                        </div>


                       
                        {/* PAGINATION */}
                       

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">



                            <div className="flex items-center gap-2">

                                <label className="text-sm">

                                    Records per page:

                                </label>


                                <select
                                    value={recordsPerPage}
                                    onChange={handleRecordsChange}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700">

                                    <option value="3">

                                        3

                                    </option>

                                    <option value="6">

                                        6

                                    </option>

                                    <option value="9">

                                        9

                                    </option>

                                    <option value="12">

                                        12

                                    </option>

                                </select>

                            </div>


                            {/* Page navigation */}

                            <div className="flex items-center gap-2">


                                <button
                                    onClick={() =>
                                        changePage(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border rounded-lg disabled:opacity-40">

                                    Previous

                                </button>


                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                ).map(page => (

                                    <button
                                        key={page}
                                        onClick={() =>
                                            changePage(page)
                                        }
                                        className={`px-4 py-2 rounded-lg ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'border hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >

                                        {page}

                                    </button>

                                ))}


                                <button
                                    onClick={() =>
                                        changePage(currentPage + 1)
                                    }
                                    disabled={
                                        currentPage === totalPages
                                    }
                                    className="px-4 py-2 border rounded-lg disabled:opacity-40">

                                    Next

                                </button>

                            </div>

                        </div>

                    </>

                )}

        </div>

    )

}


export default Tasks