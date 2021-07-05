const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
let commentsController = require('../controllers/comments.controller');

router.get('/getComments', async (req, res) => {
    try {
        let result = await commentsController.findComments(req.body);
        res.send(result);
    } catch (e) {
        console.log(e.stack);
        res.send('Unable to find comments');
    };
});

router.delete('/deleteComment', async (req, res) => {
    try {
        let { email, name, _id } = req.body;
        let predicate = {
            email,
            name,
            _id: ObjectId(_id)
        };
        let result = await commentsController.deleteComment(predicate);
        res.send(result);
    } catch (e) {
        res.send('Not deleted');
    };
});

module.exports = router;