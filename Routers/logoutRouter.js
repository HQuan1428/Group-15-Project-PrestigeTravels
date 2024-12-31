const express = require('express')
const router = express.Router()
const { logout } = require('../Controllers/logoutController')

// Đăng xuất
router.get('/logout', logout)

module.exports = router
