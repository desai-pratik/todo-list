const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    taskList.innerHTML = tasks.map(task => `<tr> <td>${task.description} </td> <td><button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button></td> </tr>`).join('');
};

const addTask = async (description) => {
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
    });
    const tasks = await response.json();
    fetchTasks();
};

const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
};

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = taskInput.value.trim();
    if (description !== '') {
        addTask(description);
        taskInput.value = '';
    }
});

fetchTasks();