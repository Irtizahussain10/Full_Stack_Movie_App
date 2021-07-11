const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/userLogin', async (req, res) => {

    try {

        let data = await usersController
            .logUserIn(req.body);
        res.send(data);

    } catch (e) {

        console.error(e);

        res.status(500).send('Something went wrong');

    };

});

router.post('/createUser', async (req, res) => {

    try {

        let result = await usersController
            .insertUser(req.body);

        res.send(result);

    } catch (e) { 

        res.status(500).send('Something went wrong');

    };

});

module.exports = router;