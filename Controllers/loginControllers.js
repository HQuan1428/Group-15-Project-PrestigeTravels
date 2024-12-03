const fs = require('fs')
const path = require('path')

// Đường dẫn tới các file JSON
const userFilePath = path.join(__dirname, '../Models/Data_SQL/user.json')
const adminFilePath = path.join(__dirname, '../Models/Data_SQL/admin.json')
const providerFilePath = path.join(__dirname, '../Models/Data_SQL/provider.json')

// Lấy nội dung từ file JSON
const getUsersFromFile = (filePath) => {
  const fileData = fs.readFileSync(filePath)
  return JSON.parse(fileData)
}

// Xử lý đăng nhập
const loginUser = (req, res) => {
  const {userType, email, password  } = req.body

  // Kiểm tra nếu email, mật khẩu, và userType được cung cấp
  if (!email || !password || !userType) {
    return res.render('login', {
      errorMessage: 'Vui lòng nhập email, mật khẩu và loại người dùng!'
    })
  }

  // Đọc dữ liệu từ các file JSON (user, admin, provider)
  let users = []
  let filePath = userFilePath

  // Kiểm tra email và mật khẩu cho từng loại người dùng
  if (userType === 'admin') {
    filePath = adminFilePath
  } else if (userType === 'provider') {
    filePath = providerFilePath
  }

  // Đọc dữ liệu người dùng từ file tương ứng
  users = getUsersFromFile(filePath)

  // Tìm người dùng theo email
  const existingUser = users.find(user => user.email === email)

  if (!existingUser) {
    return res.render('login', {
      errorMessage: 'Email không tồn tại!'
    })
  }

  // Kiểm tra mật khẩu
  if (existingUser.password !== password) {
    return res.render('login', {
      errorMessage: 'Mật khẩu sai!'
    })
  }
  // Nếu đăng nhập thành công, chuyển hướng đến trang admin hoặc provider
    if (userType === 'admin') {
    return res.redirect('/admin')
  } else if (userType === 'provider') {
    return res.redirect('/provider')
  } else if (userType === 'user') {
    return res.redirect('/user')
  } else {
    return res.redirect('/login')
  }
}

module.exports = { loginUser}
