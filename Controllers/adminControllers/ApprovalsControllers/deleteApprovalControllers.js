const { deleteApprovalById } = require('../../../Models/adminModels/Approvals/deleteApprovals');
const deleteApproval = async (req, res) => {
   const id =req.params.id;
    try {
        await deleteApprovalById(id); // Xóa người dùng theo id
        res.redirect('admin/approvals?successMessage=Xóa approvals thành công');
    } catch (error) {
        console.error('Lỗi khi xóa approvals:', error);
        res.redirect('/admin/approvals?errorMessage=Lỗi khi xóa approvals');
    }
};

module.exports = {deleteApproval};