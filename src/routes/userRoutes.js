const express = require('express');
const router = new express.Router();
const User = require('../../src/model/user');


router.post('/users', async (req, resp) => {

    const user = new User(req.body);
    try {
        await user.save();
        return resp.status(201).send(user);
    } catch (e) {
        return resp.status(422).send(e);
    }
});

router.get('/users', async (req, resp) => {
    try {
        const users = await User.find({});
        return resp.send(users);
    } catch (e) {
        return resp.status(500).send(e);
    }
});

router.get('/users/:userId', async (req, resp) => {

    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return resp.status(404).send(`User with the provided id [${userId}] not found!`);
        }

        return resp.send(user);
    } catch (error) {
        return resp.status(422).send(error);
    }

});

router.patch('/users/:userId', async (req, resp) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, {new: true, runValidators: true});

        if (!user) {
            return resp.status(404).send(`User with the provided id [${userId}] not found!`)
        }

        return resp.send(user);
    } catch (error) {
        resp.status(422).send(error);
    }
});

router.delete('/users/:userId', async (req, resp) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return resp.status(404).send(`User with the provided id [${userId}] not found!`)
        }

        return resp.send(user);
    } catch (error) {
        return resp.status(500).send(error)

    }
});

module.exports = router;
