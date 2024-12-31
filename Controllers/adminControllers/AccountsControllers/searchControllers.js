const {getUsersByName}=require('../../../Models/adminModels/Accounts/searchUser')
const Search=async(req,res)=>{
    const { name } = req.body;
    try {
        const users = await getUsersByName(name);
        if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Nếu chưa đăng nhập, chuyển đến trang login
        }
         const role = req.session.userType;
        res.render('adminViews/accounts', { accounts:users,role });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi hệ thống');
    }
}
module.exports={Search};