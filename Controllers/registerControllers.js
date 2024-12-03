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

// Lưu nội dung vào file JSON
const saveUsersToFile = (filePath, users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

// Show form đăng ký
const showRegisterForm = (req, res) => {
  res.render('register')
}

// Xử lý đăng ký và lưu dữ liệu
const registerUser = (req, res) => {
  const { userType, fullName, email, phone, password, confirmPassword } = req.body

  // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp nhau
  if (password !== confirmPassword) {
    return res.render('register', {
      errorMessage: 'Mật khẩu xác nhận không khớp!'
    })
  }

  // Kiểm tra nếu email đã tồn tại
  let users = []
  let filePath = userFilePath

  if (userType === 'admin') {
    filePath = adminFilePath
  } else if (userType === 'provider') {
    filePath = providerFilePath
  }

  // Đọc dữ liệu hiện có từ file và kiểm tra trùng lặp email
    users = getUsersFromFile(filePath)
    
  const existingUserByEmail = users.find(user => user.email === email)
  const existingUserByFullName = users.find(user => user.fullName === fullName)

  // Nếu đã tồn tại email hoặc tên người dùng, yêu cầu mật khẩu phải khác mật khẩu của người dùng đã có
  if (existingUserByEmail) {
    return res.render('register', {
      errorMessage: 'Email đã được sử dụng. Vui lòng chọn email khác.'
    })
  }

  if (existingUserByFullName) {
    // Nếu tên người dùng đã tồn tại, yêu cầu mật khẩu phải khác người dùng cũ
    if (existingUserByFullName.password === password) {
      return res.render('register', {
        errorMessage: 'Tên người dùng đã tồn tại. Mật khẩu phải khác với người dùng đã có.'
      })
    }
  }

  // Tạo đối tượng người dùng mới
  const newUser = {
    fullName,
    email,
    phone,
  password}

  // Thêm người dùng mới vào danh sách và lưu lại
  users.push(newUser)
  saveUsersToFile(filePath, users)

  // Sau khi đăng ký thành công, chuyển hướng về trang chủ với thông báo
  res.redirect('/?successMessage=Đăng+ký+thành+công!')
}

module.exports = { showRegisterForm, registerUser}
