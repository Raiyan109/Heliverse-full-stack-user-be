const User = require('../models/userModel.js');

// Create
const createUser = async (req, res) => {
    const { firstName, lastName, email, gender, avatar, domain, available } = req.body

    const user = await User.create({ firstName, lastName, email, gender, avatar, domain, available })

    if (!user) {
        return res.status(400).json({ error: 'No user can be created' })
    }

    return res.status(200).json({ user })
}

module.exports = { createUser }