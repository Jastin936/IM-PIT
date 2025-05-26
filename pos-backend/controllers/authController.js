const { User } = require('../models');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
};

// Update a user's role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    user.role = role;
    await user.save();
    res.json({ message: 'User role updated.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role.' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'User not found.' });
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  // include other authController exports here
};
