const showErrorLogs = (req, res) => {
  const role = req.session.userType
  res.render('adminViews/errors', {role}); // Render view 'errors' với layout 'adminViews'
}
module.exports = {showErrorLogs}
