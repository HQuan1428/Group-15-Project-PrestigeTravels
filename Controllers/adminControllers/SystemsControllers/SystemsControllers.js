const showSystemLogs = (req, res) => {
  const role = req.session.userType
  res.render('adminViews/systems', {role}); // Render view 'system' với layout 'adminViews'
}
module.exports = {showSystemLogs}
