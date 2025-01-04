const express = require('express')
const router = express.Router()
// Route provider: Trang nhà cung cấp
router.get('/partner', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Nếu chưa đăng nhập, chuyển đến trang login
  }
  const role = req.session.userType



  res.render('providerViews/providerViews', { user: req.user,role })
})

module.exports = router
