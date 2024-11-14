import React, { useState, useEffect } from 'react';
import { Layout } from '../Layout/Layout';
import { useFirestore } from '../Store/FireStore.jsx';
import {
    Button,
    Modal,
    TextField,
    Typography,
    Grid,
    Paper,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Skeleton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Home() {
    const { createTask, getTasksByEmail, updateTaskById, deleteTaskById } = useFirestore();
    const [tasks, setTasks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [taskData, setTaskData] = useState({ title: '', description: '' });
    const [selectedTask, setSelectedTask] = useState(null);
    const [viewTask, setViewTask] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    useEffect(() => {
        async function fetchTasks() {
            setLoading(true); // Set loading to true when fetching data
            const result = await getTasksByEmail(token, email);
            setTasks(result);
            setLoading(false); // Set loading to false once data is fetched
        }
        fetchTasks();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setTaskData({ title: '', description: '' });
        setSelectedTask(null);
    };

    const handleCreateTask = async () => {
        if (taskData.title && taskData.description) {
            await createTask(token, { email, ...taskData });
            closeModal();
            const updatedTasks = await getTasksByEmail(token, email);
            setTasks(updatedTasks);
        }
    };

    const handleUpdateTask = async (id, updatedData) => {
        await updateTaskById(token, id, updatedData);
        const updatedTasks = await getTasksByEmail(token, email);
        setTasks(updatedTasks);
    };

    const handleDeleteTask = async (id) => {
        await deleteTaskById(token, id);
        const updatedTasks = await getTasksByEmail(token, email);
        setTasks(updatedTasks);
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDrop = async (e, newStatus) => {
        const taskId = e.dataTransfer.getData('taskId');
        await handleUpdateTask(taskId, { status: newStatus });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleViewTask = (task) => {
        setViewTask(task);
    };

    const closeViewTask = () => {
        setViewTask(null);
    };

    const getStatusCardColor = (status) => {
        switch (status) {
            case 'todo':
                return '#e3f2fd';
            case 'in progress':
                return '#ffecb3';
            case 'done':
                return '#c8e6c9';
            default:
                return '#f0f8ff';
        }
    };

    return (
        <Layout>
            <Box sx={{ padding: 2 }}>
                <Button variant="contained" color="primary" onClick={openModal} sx={{ marginBottom: 2 }}>
                    Add Task
                </Button>
                <Modal open={modalIsOpen} onClose={closeModal} aria-labelledby="modal-title" aria-describedby="modal-description">
                    <Box
                        sx={{
                            width: 400,
                            margin: 'auto',
                            padding: 3,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            boxShadow: 24,
                            mt: 5,
                            border: '2px solid #1976d2'
                        }}
                    >
                        <Typography id="modal-title" variant="h6" color="text.secondary" component="h2" sx={{ marginBottom: 2 }}>
                            {selectedTask ? 'Edit Task' : 'Add New Task'}
                        </Typography>
                        <TextField
                            fullWidth
                            label="Title"
                            value={taskData.title}
                            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                            margin="normal"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={taskData.description}
                            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                            margin="normal"
                            multiline
                            rows={3}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={selectedTask ? () => handleUpdateTask(selectedTask._id, taskData) : handleCreateTask}
                            sx={{ marginRight: 1 }}
                        >
                            {selectedTask ? 'Update' : 'Create'}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </Box>
                </Modal>

                <Dialog open={!!viewTask} onClose={closeViewTask} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white' }}>Task Details</DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Title:</Typography>
                        <DialogContentText>{viewTask?.title}</DialogContentText>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2, marginBottom: 1 }}>Description:</Typography>
                        <DialogContentText>{viewTask?.description}</DialogContentText>
                    </DialogContent>
                </Dialog>

                <Grid container spacing={3}>
                    {['todo', 'in progress', 'done'].map((status) => (
                        <Grid
                            item
                            xs={12}
                            md={4}
                            key={status}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, status)}
                        >
                            <Paper
                                sx={{
                                    padding: 2,
                                    border: '2px solid #ccc',
                                    borderRadius: 2,
                                    backgroundColor: '#f0f8ff',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Typography variant="h6" sx={{ marginBottom: 1, textAlign: 'center', color: '#1976d2' }}>
                                    {status.toUpperCase()}
                                </Typography>
                                {loading ? ( // Show skeleton loading while tasks are being fetched
                                    <Skeleton variant="rectangular" width="100%" height={100} />
                                ) : (
                                    tasks.filter(task => task.status === status).map(task => (
                                        <Paper
                                            key={task._id}
                                            sx={{
                                                padding: 2,
                                                marginBottom: 2,
                                                cursor: 'pointer',
                                                border: '1px solid #1976d2',
                                                backgroundColor: getStatusCardColor(status),
                                                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                                                borderRadius: 2,
                                                transition: 'all 0.3s ease',
                                                transform: 'scale(1)',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                                },
                                            }}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, task._id)}
                                            onClick={() => handleViewTask(task)} // Open view on card click
                                        >
                                            <Typography variant="subtitle1" sx={{ color: '#0d47a1' }}>{task.title}</Typography>
                                            <Typography variant="body2" sx={{ color: '#01579b' }}>
                                                {task.description.length > 20 ? `${task.description.slice(0, 20)}...` : task.description}
                                            </Typography>
                                            <Typography variant="caption" display="block" sx={{ marginTop: 1, color: '#0d47a1' }}>
                                                Created at: {new Date(task.createdTime).toLocaleString()}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
                                                <IconButton color="error" onClick={(e) => { e.stopPropagation(); handleDeleteTask(task._id); }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton color="primary" onClick={(e) => { e.stopPropagation(); setSelectedTask(task); setTaskData({ title: task.title, description: task.description }); openModal(); }}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Box>
                                        </Paper>
                                    ))
                                )}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Layout>
    );
}
