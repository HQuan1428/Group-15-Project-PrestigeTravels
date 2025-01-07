const { rejectApprovals } = require('../../../Models/adminModels/Approvals/rejectApproval');
const reject = async (req, res) => {
    const  id = req.params.id; // Lấy id từ URL
    try {
        await rejectApprovals(id); // Xóa người dùng theo id
        res.redirect('/admin/approvals?successMessage=Từ chối dịch vụ thành công');
    } catch (error) {
        console.error('Lỗi khi từ chôi dịch vụ:', error);
        res.redirect('/admin/approvals?errorMessage=Lỗi khi từ chối dịch vụ');
    }
};

module.exports = {reject};