const { GetApprovals } = require('../../../Models/adminModels/Approvals/GetApprovals')
const showApprovalPage =async (req, res) => {
  try {
        const approvals  = await GetApprovals(); 
        res.render('adminViews/approvals', {
            approvals,
            successMessage: req.query.successMessage || '',
            errorMessage: req.query.errorMessage || ''
            
         });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
  }
module.exports = { showApprovalPage }
