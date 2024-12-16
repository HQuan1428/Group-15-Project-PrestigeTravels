const express = require('express')
const router = express.Router()
// Route provider: Trang nhà cung cấp
router.get('/provider', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');  // Nếu chưa đăng nhập, chuyển đến trang login
  }

  res.render('providerViews/providerViews', { user: req.user });
})

module.exports = router
