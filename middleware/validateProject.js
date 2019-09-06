function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!req.body) {
        return res.status(400).json({ error: "Missing project data." });
    }
    if (!name) {
        return res.status(400).json({ error: "Please enter a project name." });
    }
    if (!description) {
        return res.status(400).json({ error: "Please enter a project description." });
    }
    req.body = { name, description }
    next();
};

module.exports = validateProject;