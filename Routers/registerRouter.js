const express = require('express')
const router = express.Router()

const { showRegisterForm, registerUser } = require('../Controllers/registerControllers')

// Route hiển thị form đăng ký
router.get('/register', showRegisterForm)
router.post('/register', registerUser)

module.exports = router
