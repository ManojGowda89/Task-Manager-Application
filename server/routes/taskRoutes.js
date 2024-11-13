
const express = require('express');
const connectDB = require("mb64-connect")
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const Task = connectDB.validation("tasks",{
    email: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String },
    createdTime: { type: Date, default: Date.now },
    status: { type: String, default: 'todo' },
    comments: { type: [String], default: [] }
})

// Create Task
router.post('/tasks', authMiddleware, async (req, res) => {
    const { email, title, description } = req.body;

    const task = new Task({ email, title, description });
    await task.save();
    res.json({ message: 'Task created successfully' });
});

// Read Tasks by Email
router.get('/tasks/:email', authMiddleware, async (req, res) => {
    const { email } = req.params;
    const tasks = await Task.find({ email });

    res.json(tasks);
});

// Update Task by ID
router.put('/tasks/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    await Task.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Task updated successfully' });
});

// Delete Task by ID
router.delete('/tasks/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
});

module.exports = router;
