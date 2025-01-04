const passport = require('passport');

// Render trang đăng nhập
const renderLogin = async (req, res) => {
    // Lấy thông báo từ query parameters
    const message = req.query.message;
    res.render('login', { message });
}

// Xử lý đăng nhập
const login = async (req, res, next) => {
  passport.authenticate('custom', (err, user, info) => {
    if (err) return next(err); // Xử lý lỗi hệ thống
    if (!user) {
      return res.status(401).json({ message: info ? info.message : 'Xác thực thất bại.' }); // Xử lý khi không tìm thấy user
    }

    req.logIn(user, (err) => {
      if (err) return next(err); // Lỗi khi lưu thông tin user vào session
      req.session.username = user.fullname;
      req.session.userType = user.userType;

      // Kiểm tra loại người dùng và chuyển hướng đến trang thích hợp
      if (user.userType === 'admin') {
        return res.redirect('/admin');  // Trang quản trị viên
      } else if (user.userType === 'partner') {
        return res.redirect('/provider');  // Trang của nhà cung cấp
      } else {
        return res.redirect('/user');  // Trang của người dùng thông thường
      }
    });
  })(req, res, next); // Gọi hàm authenticate đúng cách
}

module.exports = {
  renderLogin,
  login
};
