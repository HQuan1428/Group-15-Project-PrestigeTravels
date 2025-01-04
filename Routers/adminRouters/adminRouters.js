const express = require('express')
const router = express.Router()
const {showAccounts} = require('../../Controllers/adminControllers/AccountsControllers/AccountsControllers')
const {showApprovalPage} = require('../../Controllers/adminControllers/ApprovalsControllers/ApprovalsControllers')
const {showSystemLogs} = require('../../Controllers/adminControllers/SystemsControllers/SystemsControllers')
const {showReports} = require('../../Controllers/adminControllers/ReportsControllers/ReportsControllers')
const {showErrorLogs} = require('../../Controllers/adminControllers/ErrorsControllers/ErrorsControllers')
const {showPosts} = require('../../Controllers/adminControllers/PostsControllers/PostsControllers')

// Route Admin: Trang quản trị admin
router.get('/admin', (req, res) => {
  // Kiểm tra nếu người dùng là admin
  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Nếu chưa đăng nhập, chuyển đến trang login
  }
  const role = req.session.userType

  res.render('adminViews/adminViews', {role})
})

// Route: Hiển thị danh sách tài khoản
router.get('/admin/accounts', showAccounts)
// Search
const {Search} = require('../../Controllers/adminControllers/AccountsControllers/searchControllers')
router.post('/admin/search', Search)
// addUser
const {addUserController} = require('../../Controllers/adminControllers/AccountsControllers/addUserControllers')
router.post('/admin/adduser', addUserController)
// delete user
const {deleteUser} = require('../../Controllers/adminControllers/AccountsControllers/deleteUserControllers')
router.post('/admin/delete/:id', deleteUser)

// Route: Hiển thị giao diện xét duyệt dịch vụ
router.get('/admin/approvals', showApprovalPage)
// Detail approvals 
const {Detail } = require('../../Controllers/adminControllers/ApprovalsControllers/detailApprovalControllers')
router.get('/admin/approvals/detail/:id', Detail)

// Delete approvals
const {deleteApproval } = require('../../Controllers/adminControllers/ApprovalsControllers/deleteApprovalControllers')
router.post('/admin/approvals/delete/:id', deleteApproval)
// search approvals
const { SearchApprovalByName} = require('../../Controllers/adminControllers/ApprovalsControllers/searchApprovalsControllers')
router.post('/admin/approvals/search', SearchApprovalByName)
// Route: Hiển thị hoạt động hệ thống
router.get('/admin/systems', showSystemLogs)

// Route: Hiển thị báo cáo và phân tích
router.get('/admin/reports', showReports)

// Route: Hiển thị lỗi hệ thống
router.get('/admin/errors', showErrorLogs)

// Route: Hiển thị quản lý bài viết
router.get('/admin/posts', showPosts)

module.exports = router
