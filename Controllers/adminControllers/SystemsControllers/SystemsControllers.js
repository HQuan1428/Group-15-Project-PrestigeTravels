const {GetSystem}=require('../../../Models/adminModels/Systems/systemModel')
const showSystemLogs = async (req, res) => {

    try {
      const system = await GetSystem();


  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Nếu chưa đăng nhập, chuyển đến trang login
  }  
  const role = req.session.userType
  res.render('adminViews/systems', {system, role }); 
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu system_status:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
}
module.exports = {showSystemLogs}
