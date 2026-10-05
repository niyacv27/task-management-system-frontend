import React from 'react'

function TaskForm({
    task,
    setTask,
    handleSubmit,
    buttonText = "Add Task"
}) {


    const handleChange = (e) => {

        const { name, value } = e.target

        setTask({
            ...task,
            [name]: value
        })

    }


    return (

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">


            <div className="mb-5">

                <label className="block font-medium mb-2">
                    Task Title
                </label>

                <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Enter task title" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />

            </div>


            <div className="mb-5">

                <label className="block font-medium mb-2">
                    Description
                </label>

                <textarea name="description" value={task.description} onChange={handleChange} placeholder="Enter task description" rows="4" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500">
                </textarea>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                <div>

                    <label className="block font-medium mb-2">
                        Priority
                    </label>

                    <select name="priority" value={task.priority} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500">

                        <option value="">
                            Select Priority
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


                {/* Status section */}

                <div>

                    <label className="block font-medium mb-2">
                        Status
                    </label>

                    <select name="status" value={task.status} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500">

                        <option value="">
                            Select Status
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


            </div>


            {/* Deadline section */}

            <div className="mt-5">

                <label className="block font-medium mb-2">
                    Deadline
                </label>

                <input type="date" name="deadline" value={task.deadline} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">


                {/* Category */}

                <div>

                    <label className="block font-medium mb-2">
                        Category
                    </label>

                    <select name="category" value={task.category} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500">

                        <option value="">
                            Select Category
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


                {/* Assigned Person */}

                <div>

                    <label className="block font-medium mb-2">
                        Assigned Person
                    </label>

                    <input type="text" name="assignedPerson" value={task.assignedPerson} onChange={handleChange} placeholder="Enter assigned person" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />

                </div>


            </div>


            {/* Submit section */}

            <button type="submit" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                {buttonText}
            </button>


        </form>

    )

}

export default TaskForm