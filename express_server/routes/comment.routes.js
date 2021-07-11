const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
let commentsController = require('../controllers/comments.controller');

router.post('/getComments', async (req, res) => {

    try {

        let result = await commentsController
            .findComments(req.body);
        res.send(result);

    } catch (e) {

        res.status(500).send('Something went wrong');
        
    };

});

router.post('/insertComment', async (req, res) => {

    try {

        let predicate = {
            name: req.body.name,
            email: req.body.email,
            movie_id: ObjectId(req.body.movie_id),
            text: req.body.text,
            date: new Date(req.body.date)
        };

        let result = await commentsController
            .insertComment(predicate);

        res.send(result);

    } catch (e) {

        res.status(500).send('Something went wrong');

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

        let result = await commentsController
            .deleteComment(predicate);

        res.send(result);

    } catch (e) {

        res.status(500).send('Something went wrong');

    };

});

module.exports = router;