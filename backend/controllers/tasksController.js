const Task = require('../models/Task')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all tasks 
// @route GET /tasks
// @access Private
const getAllTasks = asyncHandler(async (req, res) => {
    // Get all tasks from MongoDB
    const tasks = await Task.find().lean()

    // If no tasks 
    if (!tasks?.length) {
        return res.status(400).json({ message: 'No tasks found' })
    }

    // Add username to each task before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const tasksWithUser = await Promise.all(tasks.map(async (task) => {
        const user = await User.findById(task.user).lean().exec()
        return { ...task, username: user.username }
    }))

    res.json(tasksWithUser)
    
})

// @desc Get task by ID
// @route GET /task
// @access Private
const getTaskById = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Task ID Required' })
    }
    
    // Get user from MongoDB
    const task = await Task.findById(id).lean()

    // If no user 
    if (!task) {
        return res.status(400).json({ message: 'No task found' })
    }

    res.json(task)
})

// @desc Create new task
// @route POST /tasks
// @access Private
const createNewTask = asyncHandler(async (req, res) => {
    const { user, title, category, description, priority, date } = req.body

    // Confirm data
    if (!user || !title || !category || !description || !Array.isArray(priority) || !priority.length || !date) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Task.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate task title' })
    }

    // Create and store the new user 
    const task = await Task.create({ user, title, category, description, priority, date })

    if (task) { // Created 
        return res.status(201).json({ message: 'New task created' })
    } else {
        return res.status(400).json({ message: 'Invalid task data received' })
    }

})

// @desc Update a task
// @route PATCH /tasks
// @access Private
const updateTask = asyncHandler(async (req, res) => {
    const { id, user, title, category, description, priority, date, done } = req.body

    // Confirm data
    if (!id || !user || !title || !category || !description || !Array.isArray(priority) || !priority.length || !date || typeof done !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const task = await Task.findById(id).exec()

    if (!task) {
        return res.status(400).json({ message: 'Task not found' })
    }

    // Check for duplicate title
    const duplicate = await Task.findOne({ title }).lean().exec()

    // Allow renaming of the original task 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate task title' })
    }

    task.user = user
    task.title = title
    task.category = category
    task.description = description
    task.priority = priority
    task.date = date
    task.done = done

    const updatedTask = await task.save()

    res.json(`'${updatedTask.title}' updated`)
})

// @desc Delete a task
// @route DELETE /tasks
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Task ID required' })
    }

    // Confirm task exists to delete 
    const task = await Task.findById(id).exec()

    if (!task) {
        return res.status(400).json({ message: 'Task not found' })
    }

    const result = await task.deleteOne()

    const reply = `Task '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllTasks,
    getTaskById,
    createNewTask,
    updateTask,
    deleteTask
}