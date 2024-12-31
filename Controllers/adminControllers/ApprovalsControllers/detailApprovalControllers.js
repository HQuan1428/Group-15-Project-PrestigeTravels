const {DetailApproval}=require('../../../Models/adminModels/Approvals/DetailApproval')
const Detail=async(req,res)=>{
    const { id } = req.params;
    try {
        const detail = await DetailApproval(id);
        if (!req.isAuthenticated()) {
           return res.redirect('/login'); 
        }
         const role = req.session.userType;
        res.render('adminViews/approvals/detailApproval', { detail :detail, role });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi hệ thống');
    }
}
module.exports={Detail};