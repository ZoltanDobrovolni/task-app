const express = require('express');
const taskRoutes = new express.Router();
const Task = require('./../../src/model/task');


taskRoutes.post('/tasks', async (req, resp) => {
    try {
        const task = new Task(req.body);
        await task.save();
        resp.status(201).send(task);
    } catch (error) {
        return resp.status(422).send(error);
    }
});

taskRoutes.get('/tasks', async (req, resp) => {
    try {
        const tasks = await Task.find({});
        return resp.send(tasks);

    } catch (error) {
        return resp.status(500).send(error);
    }

});

taskRoutes.get('/tasks/:taskId', async (req, resp) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (!task) {
            return resp.status(404).send(`Task with the provided id [${taskId}] not found!`);
        }
        return resp.send(task);
    } catch (error) {
        return resp.status(422).send(error);
    }
});

taskRoutes.patch('/tasks/:taskId', async (req, resp) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

        if (!task) {
            resp.status(404).send(`Task with the provided id [${taskId}] not found!`);
        }
        resp.send(task);
    } catch (error) {
        resp.status(400).send(error);
    }
});

taskRoutes.delete('/tasks/:taskId', async (req, resp) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return resp.status(404).send(`Task with the provided id [${taskId}] not found!`)
        }

        return resp.send(task);
    } catch (error) {
        return resp.status(500).send(error)

    }
})

module.exports = taskRoutes;
