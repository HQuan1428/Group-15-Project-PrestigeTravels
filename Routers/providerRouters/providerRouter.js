const express = require('express')
const router = express.Router()
// Route provider: Trang nhà cung cấp
router.get('/provider', (req, res) => {
  res.render('providerViews/providerViews')
})

module.exports = router
