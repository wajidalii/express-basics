exports.getAllTasks = async (req, res) => {
    res.send('Get all tasks');
}

exports.getTaskById = async (req, res) => {
    res.send(`Get task with ID ${req.params.id}`);
}

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    res.status(201).json({ message: 'Task created', title, description });
}

exports.updateTask = async (req, res) => {
    res.send(`Update task with ID ${req.params.id}`);
}

exports.deleteTask = async (req, res) => {
    res.send(`Delete task with ID ${req.params.id}`);
}