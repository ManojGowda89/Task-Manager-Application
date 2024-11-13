// server.js
const express = require('express');
const cors= require("cors")
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require("mb64-connect")
const app = express();
app.use(express.json());
app.use(cors())
connectDB("mongodb+srv://ManojGowda:GIxUtC7XGPC0msCO@cluster0.lqo2toa.mongodb.net/Tasks")
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
