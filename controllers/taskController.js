export function getAllTasks(req, res) {
    res.send('Get all tasks');
}

export function getTaskById(req, res) {
    res.send(`Get task with ID ${req.params.id}`);
}

export function createTask(req, res) {
    const { title, description } = req.body;
    res.status(201).json({ message: 'Task created', title, description });
}

export function updateTask(req, res) {
    res.send(`Update task with ID ${req.params.id}`);
}

export function deleteTask(req, res) {
    res.send(`Delete task with ID ${req.params.id}`);
}