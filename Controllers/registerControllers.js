const { checkAccountExists, addUser } = require('../Models/adminModels/Auth/adminModels')
const bcrypt = require('bcrypt')
const showRegisterForm = async (req, res) => {
  res.render('register')  // Trả về trang đăng kí
}

const registerUser = async (req, res) => {
    const { userType,fullName, email,phone, password } = req.body;
    try { 
        const userExists = await checkAccountExists(email);
      if (userExists) {
            return res.render('register', {
                errorMessage: 'Email đã tồn tại, vui lòng chọn email khác!',
                fullName, email, phone // Giữ lại dữ liệu người dùng đã nhập
            });
            
        }

        //hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        await addUser(userType,fullName, email,phone, hashedPassword);
        res.redirect('/login');
    }
    catch(err) {
      console.log('Lỗi đăng kí ', err);
      res.render('register', {
            errorMessage: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
            fullName, email, phone
        });
        
    }
}
module.exports = {showRegisterForm, registerUser}