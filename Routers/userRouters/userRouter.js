const express = require('express')
const router = express.Router()
router.get('/customer', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Nếu chưa đăng nhập, chuyển đến trang login
  }
  const role = req.session.userType


  res.render('userViews/home', { user: req.user,role })
})
module.exports = router
