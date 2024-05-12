const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

const app = express(); 
app.use(bodyParser.json()); 

app.use(cors());
let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});
 
app.post('/tasks', (req, res) => {
    const { description } = req.body; 
    if (!description) {
        return res.status(400).json({ error: 'Task description cannot be empty' });
    } 
    tasks.push({ id: tasks.length + 1, description }); 
    res.json(tasks);
});
 
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const index = tasks.findIndex(task => task.id === id); 
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    } 
    tasks.splice(index, 1); 
    res.json(tasks);
});
 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});