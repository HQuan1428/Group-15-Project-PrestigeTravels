const { checkAccountExists, addUser, getUserByEmail } = require('../Models/adminModels/Auth/adminModels');
const { addPartner } = require('../Models/providerModels/partnerModels'); // Thêm hàm tạo partner
const bcrypt = require('bcrypt');

const showRegisterForm = async (req, res) => {
  res.render('register'); // Trả về trang đăng ký
};

const registerUser = async (req, res) => {
  const { userType, fullName, email, phone, password } = req.body;
  try {
    const userExists = await checkAccountExists(email);
    if (userExists) {
      return res.render('register', {
        errorMessage: 'Email đã tồn tại, vui lòng chọn email khác!',
        fullName,
        email,
        phone, // Giữ lại dữ liệu người dùng đã nhập
      });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    await addUser(userType, fullName, email, phone, hashedPassword);

    // Kiểm tra nếu người dùng là `partner`, thêm bản ghi vào bảng `partners`
    if (userType === 'partner') {
      const newUser = await getUserByEmail(email); // Lấy thông tin người dùng vừa tạo
      await addPartner(newUser.id, fullName, phone); // Gọi hàm tạo partner
    }

    res.redirect('/login');
  } catch (err) {
    console.log('Lỗi đăng ký ', err);
    res.render('register', {
      errorMessage: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
      fullName,
      email,
      phone,
    });
  }
};

module.exports = { showRegisterForm, registerUser };
