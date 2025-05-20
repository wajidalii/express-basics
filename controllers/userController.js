export function getAllUsers(req, res) {
    res.send('Get all users');
}

export function getUserById(req, res) {
    res.send(`Get user with ID ${req.params.id}`);
}

export function createUser(req, res) {
    const { name, email } = req.body;
    res.status(201).json({ message: 'User created', name, email });
}

export function updateUser(req, res) {
    res.send(`Update user with ID ${req.params.id}`);
}

export function deleteUser(req, res) {
    res.send(`Delete user with ID ${req.params.id}`);
}  