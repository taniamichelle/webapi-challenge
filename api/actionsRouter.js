const express = require('express');
const Actions = require('../data/helpers/actionModel');
const router = express.Router('express');

const validateAction = require('../middleware/validateAction');
const validateActionId = require('../middleware/validateActionId');

// get all actions
router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving projects." });
        });
});

// get action by id
router.get('/:id', validateActionId, (req, res) => {
    const { id } = req.action;
    Actions.get(id)
        .then(() => {
            res.status(200).json(req.action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving actions." });
        });
});

// update an action by id
router.put('/:id', validateAction, validateActionId, (req, res) => {
    const { id } = req.params;
    const { description, notes } = req.body;
    Actions.update(id, { description, notes })
        .then(updated => {
            if (updated) {
                res.status(200).json(req.body);
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error updating action." });
        });
});

// delete an action by id
router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error deleting action." })
        });
});


module.exports = router;