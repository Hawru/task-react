const User = require('../models/User')
const Task = require('../models/Task')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No user found' })
    }

    res.json(users)
})

// @desc Get user by ID
// @route GET /users
// @access Private
const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }
    
    // Get user from MongoDB
    const user = await User.findById(id).select('-password').lean()

    // If no user 
    if (!user) {
        return res.status(400).json({ message: 'No user found' })
    }

    res.json(user)
})
  
// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { name, lastname, username, email, password, birthdate, imgprofile, active } = req.body

    // Confirm data
    if (!name || !username || !password || !email) {
        return res.status(400).json({ message: 'Some fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Check for duplicate email
    const duplicate2 = await User.findOne({ email }).lean().exec()

    if (duplicate2) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { name, username, email,  "password": hashedPwd }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, name, lastname, username, email, birthdate, imgprofile, active, password } = req.body

    // Confirm data 
    if (!id || !name || !username || !email || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'Some fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.name = name
    user.lastname = lastname
    user.username = username
    user.email = email
    user.birthdate = birthdate
    user.imgprofile = imgprofile
    user.active = active

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned tasks?
    const task = await Task.findOne({ user:id }).lean().exec()
    if (task) {
        return res.status(400).json({ message: 'User has assigned tasks' })
    }
    
    // Does the user exist to delete?
    
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
}