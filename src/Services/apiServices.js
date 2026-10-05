import axiosService from '../api/axiosService'


// AUTHENTICATION


// Register user

export const registerAPI = async (user) => {

    return await axiosService("POST","/users",user)

}



export const loginAPI = async (email) => {

    return await axiosService("GET",`/users?email=${email}`)

}



// TASK API


// Get all tasks

export const getAllTasksAPI = async () => {

    return await axiosService("GET","/tasks")

}


// Get single task

export const getSingleTaskAPI = async (id) => {

    return await axiosService("GET",`/tasks/${id}`)

}


// Add task

export const addTaskAPI = async (task) => {

    return await axiosService("POST","/tasks",task)

}


// Update task

export const updateTaskAPI = async (id, task) => {

    return await axiosService("PUT",`/tasks/${id}`,task)

}


// Delete task

export const deleteTaskAPI = async (id) => {

    return await axiosService("DELETE",`/tasks/${id}`)

}