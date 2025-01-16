const passport = require('passport');

// Render trang đăng nhập
const renderLogin = async (req, res) => {
    const message = req.query.message; // Lấy thông báo từ query nếu có
    res.render('login', { message });
};

// Xử lý đăng nhập
const login = async (req, res, next) => {
    passport.authenticate('custom', (err, user, info) => {
        if (err) return next(err); // Xử lý lỗi hệ thống

        if (!user) {
            // Render lại trang đăng nhập với thông báo lỗi
            return res.render('login', { message: info ? info.message : 'Xác thực thất bại.' });
        }

        req.logIn(user, (err) => {
            if (err) return next(err); // Lỗi khi lưu thông tin user vào session

            req.session.username = user.fullname;
            req.session.userType = user.userType;
            req.session.user_id = user.id;

            // Chuyển hướng đến trang thích hợp dựa trên userType
            if (user.userType === 'admin') {
                return res.redirect('/admin');
            } else if (user.userType === 'partner') {
                return res.redirect('/partner');
            } else if (user.userType === 'customer') {
                return res.redirect('/customer');
            } else {
                return res.render('login', { message: 'Loại người dùng không xác định!' });
            }
        });
    })(req, res, next);
};

module.exports = {
    renderLogin,
    login,
};
