const showReports = (req, res) => {
  const role = req.session.userType
  res.render('adminViews/reports', {role}); // Render view 'reports' với layout 'adminViews'
}

module.exports = {showReports}
