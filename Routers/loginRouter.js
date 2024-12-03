const express = require('express')
const router = express.Router()
const { loginUser } = require('../Controllers/loginControllers') // Đảm bảo đường dẫn đúng

// Hiển thị trang đăng nhập
router.get('/login', (req, res) => {
  res.render('login') // render trang login
})

// Xử lý đăng nhập
router.post('/login', loginUser)

module.exports = router
