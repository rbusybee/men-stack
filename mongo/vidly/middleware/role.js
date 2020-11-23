const { func } = require("joi");

function isAdmin(req, res, next) {
    // 401 Unauthorized
    // 403 Forbidden
    if(!req.user.isAdmin) return res.status(403).send('Access Denied');
    next();
}

exports.admin = isAdmin;