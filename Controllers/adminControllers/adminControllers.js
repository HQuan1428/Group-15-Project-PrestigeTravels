// Controller cho trang admin
// Bạn có thể kết nối database để lấy dữ liệu thực tế

// Hiển thị danh sách tài khoản
const showAccounts = (req, res) => {
  // Dữ liệu mẫu (thay thế bằng dữ liệu từ database)
  const accounts = [
    { name: 'Nguyễn Văn A', email: 'A@gmail.com', phone: '123456', type: 'User', status: 'Active' },
    { name: 'Nguyễn Văn B', email: 'B@gmail.com', phone: '789012', type: 'Admin', status: 'Inactive' },
    { name: 'Nguyễn Văn C', email: 'C@gmail.com', phone: '345678', type: 'Company', status: 'Locked' }
  ]

  // Render giao diện admin/accounts và truyền dữ liệu accounts
  res.render('admin/accounts', { accounts})
}

// Hiển thị giao diện xét duyệt dịch vụ
const showApprovalPage = (req, res) => {
  res.render('approvals'); // Render view 'approval'
}

// Hiển thị hoạt động hệ thống
const showSystemLogs = (req, res) => {
  res.render('systems'); // Render view 'system'
}

// Hiển thị báo cáo và phân tích
const showReports = (req, res) => {
  res.render('reports'); // Render view 'reports'
}

// Hiển thị lỗi hệ thống
const showErrorLogs = (req, res) => {
  res.render('admin/errors'); // Render view 'errors'
}

// Hiển thị quản lý bài viết
const showPosts = (req, res) => {
  res.render('admin/posts'); // Render view 'posts'
}

// Xuất các hàm để sử dụng trong routes
module.exports = {
  showAccounts,
  showApprovalPage,
  showSystemLogs,
  showReports,
  showErrorLogs,
showPosts}
