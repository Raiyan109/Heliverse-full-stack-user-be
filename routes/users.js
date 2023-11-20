const express = require('express');
const { createUser, getAllUsers, getUser, updateUser, deleteUser, paginatedUsers } = require('../controllers/userController');

const router = express.Router()

router.post('/create', createUser)
router.get('/', getAllUsers)
// Pagination
router.get('/paginated', paginatedUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)




module.exports = router