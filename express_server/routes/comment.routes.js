const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
let commentsController = require('../controllers/comments.controller');

router.delete('/deleteComment', async (req, res) => {
    try {
        let {email, name, _id} = req.body;
        let predicate = {
            email,
            name,
            _id: ObjectID(_id) 
        };
        let result = await commentsController.deleteComment(predicate);
        res.send(result);
    } catch (e) {
        res.send('Not deleted');
    };
});

module.exports = router;