const express = require('express');
const router = express.Router();
const { renderLogin, login } = require('../Controllers/loginControllers'); // Đảm bảo đường dẫn đúng

// Hiển thị trang đăng nhập
router.get('/login', renderLogin);

// Xử lý đăng nhập
router.post('/login', login);

module.exports = router;
