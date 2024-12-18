const { GetAllUser } = require('../../../Models/adminModels/Accounts/GetUser');

const showAccounts = async (req, res) => {
    try {
        const accounts = await GetAllUser(); 
        res.render('adminViews/accounts', {
            accounts,
            successMessage: req.query.successMessage || '',
            errorMessage: req.query.errorMessage || ''
            
         });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};

module.exports = { showAccounts };
