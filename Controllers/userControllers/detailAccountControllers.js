const { getUserById}=require('../../Models/adminModels/Auth/adminModels')

const showdetailAcoount = async (req, res) =>
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
     const user_id = req.session.user_id;
    const user = await getUserById(user_id);
    const role = req.session.userType;
    res.render('userViews/infoAccount',{role, user})
}
module.exports={showdetailAcoount}