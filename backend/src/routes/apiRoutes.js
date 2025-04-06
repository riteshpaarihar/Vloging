import express from 'express';

const routes = express.Router();

// GET request to get all users 

routes.get('/users', (req, res) => {
    // Mock data
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com' }
    ];

    res.json(users);
});


export default routes;