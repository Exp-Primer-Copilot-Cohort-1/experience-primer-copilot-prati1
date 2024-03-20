// Create web server
// Create API
// Create comments
// Create a new comment
// Get all comments
// Get a specific comment
// Update a comment
// Delete a comment

// Create web server
const express = require('express');
const app = express();

// Create API
const router = express.Router();
app.use('/api', router);

// Create comments
let comments = [
    { id: 1, author: 'John', body: 'Hello, World!' },
    { id: 2, author: 'Jane', body: 'Hi, there!' }
];

// Create a new comment
router.post('/comments', (req, res) => {
    let comment = req.body;
    comments.push(comment);
    res.status(201).send(comment);
});

// Get all comments
router.get('/comments', (req, res) => {
    res.status(200).send(comments);
});

// Get a specific comment
router.get('/comments/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let comment = comments.find(comment => comment.id === id);
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        res.status(200).send(comment);
    }
});

// Update a comment
router.put('/comments/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let newComment = req.body;
    let comment = comments.find(comment => comment.id === id);
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        comment.author = newComment.author;
        comment.body = newComment.body;
        res.status(200).send(comment);
    }
});

// Delete a comment
router.delete('/comments/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let index = comments.findIndex(comment => comment.id === id);
    if (index === -1) {
        res.status(404).send('Comment not found');
    } else {
        comments.splice(index, 1);
        res.status(204).send();
    }
});

app.listen(3000, () => console.log('Server is running'));