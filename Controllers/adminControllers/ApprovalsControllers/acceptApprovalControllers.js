const { acceptApprovalById } = require('../../../Models/adminModels/Approvals/acceptApprovals');
const acceptApproval = async (req, res) => {
   const id =req.params.id;
    try {
        await acceptApprovalById(id); // Xóa người dùng theo id
        res.redirect('/admin/approvals?successMessage=Chấp nhận approvals thành công');
    } catch (error) {
        console.error('Lỗi khi chấp nhận approvals:', error);
        res.redirect('/admin/approvals?errorMessage=Lỗi khi xóa approvals');
    }
};

module.exports = {acceptApproval};