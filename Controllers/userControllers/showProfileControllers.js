const { getUserById}=require('../../Models/adminModels/Auth/adminModels')
const showProfile = async (req, res) => {
    if (!req.isAuthenticated()) {
           return res.redirect('/login'); 
    }
    const user_id = req.session.user_id;
    const user = await getUserById(user_id);
    //console.log(user);
    const role = req.session.userType;
    res.render('userViews/profile',{role,user})
}
module.exports={showProfile}