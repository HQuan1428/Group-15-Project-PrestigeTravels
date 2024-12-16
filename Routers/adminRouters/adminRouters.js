const express = require('express')
const router = express.Router()
const { showAccounts, showApprovalPage, showSystemLogs, showReports, showErrorLogs, showPosts } = require('../../Controllers/adminControllers/adminControllers')

// Route Admin: Trang quản trị admin
router.get('/admin', (req, res) => {
  // Kiểm tra nếu người dùng là admin
  if (!req.isAuthenticated()) {
    return res.redirect('/login');  // Nếu chưa đăng nhập, chuyển đến trang login
  }

  res.render('adminViews/admin', { user: req.user });
})

// Route: Hiển thị danh sách tài khoản
router.get('/accounts', showAccounts)

// Route: Hiển thị giao diện xét duyệt dịch vụ
router.get('/approvals', showApprovalPage)

// Route: Hiển thị hoạt động hệ thống
router.get('/systems', showSystemLogs)

// Route: Hiển thị báo cáo và phân tích
router.get('/reports', showReports)

// Route: Hiển thị lỗi hệ thống
router.get('/errors', showErrorLogs)

// Route: Hiển thị quản lý bài viết
router.get('/posts', showPosts)

module.exports = router
