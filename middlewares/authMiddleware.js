function ensureAuthenticated(req, res, next) {
    
    if (req.isAuthenticated() && req.user.userType === 'partner') {
        return next();
    }
    res.redirect('/login');
}

module.exports = { ensureAuthenticated };
