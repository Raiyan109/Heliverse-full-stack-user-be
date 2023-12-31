const User = require('../models/userModel.js');

// Get all
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(400).json({ error: 'No user found' })
        }
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({ error: 'No user' })
    }
}

// GET single
const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({ error: 'No user found by this id' })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: 'No user found by this id' })
    }
}

// Paginated User

const paginatedUsers = async (req, res) => {

    const allUser = await User.find({})
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const lastIndex = (page) * limit

    const results = {}
    results.totalUser = allUser.length
    results.pageCount = Math.ceil(allUser.length / limit)

    if (lastIndex < allUser.length) {
        results.next = {
            page: page + 1,
        }
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
        }
    }

    results.result = allUser.slice(startIndex, lastIndex)

    res.status(200).json(results)
}

// Create
const createUser = async (req, res) => {
    const { firstName, lastName, email, gender, avatar, domain, available } = req.body

    const user = await User.create({ firstName, lastName, email, gender, avatar, domain, available })

    if (!user) {
        return res.status(400).json({ error: 'No user can be created' })
    }

    return res.status(200).json({ user })
}

// Update
const updateUser = async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, gender, avatar, domain, available } = req.body

    try {
        const user = await User.findByIdAndUpdate(id, {
            firstName, lastName, email, gender, avatar, domain, available
        })

        if (!user) {
            return res.status(400).json({ error: 'Cant update' })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: 'No user found by this id' })
    }

}

// Delete
const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(400).json({ error: 'Cant Delete by this id' })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: 'No user found by this id' })
    }
}



module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser, paginatedUsers }