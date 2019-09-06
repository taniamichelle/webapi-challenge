function validateAction(req, res, next) {
    const { id: project_id } = req.params;
    const { description, notes } = req.body;
    if (!req.body) {
        return res.status(400).json({ error: "Body is required." });
    }
    if (!description) {
        return res.status(400).json({ error: "Please enter a description." });
    }
    if (description.length >= 128) {
        return res.status(400).json({ error: "Description must be 128 characters or less." });
    }
    if (!notes) {
        return res.status(400).json({ error: "Please enter notes." });
    }
    req.body = { project_id, description, notes };
    next();
};

module.exports = validateAction;