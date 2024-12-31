const { GetAllUser } = require('../../../Models/adminModels/Accounts/GetUser');

const showAccounts = async (req, res) => {
    try {
        const accounts = await GetAllUser(); 
        if (!req.isAuthenticated()) {
          return res.redirect('/login'); // Nếu chưa đăng nhập, chuyển đến trang login
        }
         const role = req.session.userType;
        res.render('adminViews/accounts', {
            accounts,
            successMessage: req.query.successMessage || '',
            errorMessage: req.query.errorMessage || '',
            role 
            
         });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};

module.exports = { showAccounts };
