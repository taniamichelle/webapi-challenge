const Actions = require('../data/helpers/actionModel');

function validateActionId(req, res, next) {
    const { id: action_id } = req.params;
    Actions.get(action_id)
        .then(action => {
            if (action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({ error: "Invalid action id." });
            }
        })
};

module.exports = validateActionId;