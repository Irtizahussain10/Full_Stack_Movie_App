const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/userLogin', async (req, res) => {
    try {
        let data = await usersController.logUserIn(req.body);
        res.send(data);
    } catch (e) {
        console.error(e);
        res.send('Something went wrong');
    };
});

router.post('/createUser', async (req, res) => {
    try {
        let insert = await usersController.insertUser(req.body)
        res.send(insert.toString());
    } catch (e) {
        console.error(e);
        res.send('Something went wrong');
    }
});

module.exports = router;