const showPosts = (req, res) => {
  const role = req.session.userType
  res.render('adminViews/quanliBaiViet', {role}); // Render view 'posts' với layout 'adminViews'
}
module.exports = {showPosts}
