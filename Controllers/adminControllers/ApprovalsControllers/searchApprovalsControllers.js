const {getApprovalByName}=require('../../../Models/adminModels/Approvals/SearchApproval')
const SearchApprovalByName=async(req,res)=>{
    const { name } = req.body;
    try {
        const approvalByName = await getApprovalByName(name);
        if (!req.isAuthenticated()) {
    return res.redirect('/login'); 
        }
         const role = req.session.userType;
        res.render('adminViews/approvals', { approvals:approvalByName,role });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi hệ thống');
    }
}
module.exports={SearchApprovalByName};