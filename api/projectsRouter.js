const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router('express');

const validateProject = require('../middleware/validateProject');
const validateProjectId = require('../middleware/validateProjectId');
const validateAction = require('../middleware/validateAction');

// get all projects
router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving projects." });
        });
});

// add new project
router.post('/', validateProject, (req, res) => {
    const project = req.body;
    Projects.insert(project)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error adding project." });
        });
});

// get project and associated actions by id 
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

// update project by id
router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    Projects.update(id, { name, description })
        .then(updated => {
            if (updated) {
                Projects.get(id)
                    .then(project => res.status(200).json(project))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "Error finding project by that id." });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error updating project." });
        });
});

// delete project by id
router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.project;
    Projects.remove(id)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error deleting project." })
        });
});

// add action to project by id
router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
    const action = req.body;
    Actions.insert(action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error adding action to project." });
        });
});

module.exports = router;

