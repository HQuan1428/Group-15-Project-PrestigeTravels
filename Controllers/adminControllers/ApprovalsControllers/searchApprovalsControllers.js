const {getApprovalByName}=require('../../../Models/adminModels/Accounts/searchUser')
const Search=async(req,res)=>{
    const { name } = req.body;
    try {
        const approvalByName = await getApprovalByName(name);
        if (!req.isAuthenticated()) {
    return res.redirect('/login'); 
        }
         const role = req.session.userType;
        res.render('adminViews/accounts', { accounts:approvalByName,role });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi hệ thống');
    }
}
module.exports={Search};