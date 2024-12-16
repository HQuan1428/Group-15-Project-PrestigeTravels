const express = require('express')
const router = express.Router()
const { showAccounts, showApprovalPage, showSystemLogs, showReports, showErrorLogs, showPosts } = require('../../Controllers/adminControllers/adminControllers')

// Route Admin: Trang quản trị admin
router.get('/admin', (req, res) => {
  // Kiểm tra nếu người dùng là admin
  if (!req.isAuthenticated()) {
    return res.redirect('/login');  // Nếu chưa đăng nhập, chuyển đến trang login
  }

  res.render('adminViews/adminViews', { user: req.user });
})

// Route: Hiển thị danh sách tài khoản
router.get('admin/accounts', showAccounts)

// Route: Hiển thị giao diện xét duyệt dịch vụ
router.get('admin/approvals', showApprovalPage)

// Route: Hiển thị hoạt động hệ thống
router.get('admin/systems', showSystemLogs)

// Route: Hiển thị báo cáo và phân tích
router.get('admin/reports', showReports)

// Route: Hiển thị lỗi hệ thống
router.get('admin/errors', showErrorLogs)

// Route: Hiển thị quản lý bài viết
router.get('admin/posts', showPosts)

module.exports = router
