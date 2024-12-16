const express = require('express')
const router = express.Router()
router.get('/user', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');  // Nếu chưa đăng nhập, chuyển đến trang login
      }
    
      res.render('userViews/home', { user: req.user });
})
module.exports = router
