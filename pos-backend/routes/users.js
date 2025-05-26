const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUserRole, deleteUser } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

// All routes under /api/users will use these

// GET all users (Admin only)
router.get('/', verifyToken, isAdmin, getAllUsers);

// GET user by ID (Admin only)
router.get('/:id', verifyToken, isAdmin, getUserById);

// PUT update user role (Admin only)
router.put('/:id/role', verifyToken, isAdmin, updateUserRole);

// DELETE user (Admin only)
router.delete('/:id', verifyToken, isAdmin, deleteUser);

module.exports = router;
