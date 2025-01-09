const showProfile = async (req, res) => {
    if (!req.isAuthenticated()) {
           return res.redirect('/login'); 
        }
         const role = req.session.userType;
    res.render('userViews/profile',{role})
}
module.exports={showProfile}