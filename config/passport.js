const passport = require('passport');
const bcrypt = require('bcrypt');
const { getUserByEmail, getUserById } = require('../Models/adminModels/Auth/adminModels'); // Các hàm lấy người dùng từ DB

class CustomStrategy extends passport.Strategy {
  constructor(options = {}, verify) {
    super();
    this.name = options.name || 'custom';
    this.verify = verify;
  }

  authenticate(req, options) {
    const { email, password } = req.body;

    // Kiểm tra đầu vào hợp lệ
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return this.fail({ message: 'Dữ liệu đầu vào không hợp lệ.' });
    }

    this.verify(email, password, (err, user, info) => {
      if (err) {
        return this.error(err); // Trả về lỗi hệ thống
      }

      if (!user) {
        return this.fail(info || { message: 'Xác thực thất bại.' }); // Trả về thông báo lỗi người dùng
      }

      return this.success(user); // Đăng nhập thành công
    });
  }
}

// Hàm xác thực
const verify = async (email, password, done) => {
  try {
      const user = await getUserByEmail(email); // Lấy người dùng từ DB theo email
    if (!user) {
      return done(null, false, { message: 'Email hoặc mật khẩu của bạn không đúng.' });
    }
    // if (userType != user.role) {
    //   return done(null, false, { message: 'Dữ liệu không hợp lệ.' });
    // }


    // Kiểm tra mật khẩu
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Email hoặc mật khẩu của bạn không đúng.' });
    }

    return done(null, { id: user.id, fullname: user.fullname, userType: user.role });
  } catch (err) {
    return done(err); // Xử lý lỗi hệ thống
  }
};

// Sử dụng chiến lược tùy chỉnh cho Passport
passport.use(new CustomStrategy({}, verify));

// Lưu trữ ID người dùng vào session khi đăng nhập
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Lấy thông tin người dùng từ session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    
    if (!user) {
      return done(new Error('Không tìm thấy người dùng'));
    }

    // Thêm userType để kiểm tra trong middleware
    done(null, { id: user.id, fullname: user.fullname, userType: user.role });
  } catch (err) {
    done(err);
  }
});
// Khởi tạo passport với chiến lược tùy chỉnh
function initializePassport(passport) {
  passport.use(new CustomStrategy({}, verify));
}

module.exports = { initializePassport };
