const express = require('express');
const { renderPartnerDashboard, createNewTour, updateExistingTour, viewTours } = require('../../Controllers/providerController/providerControllers');
const { renderSettings, updatePersonalInfo, addEmail, addPhone } = require('../../Controllers/providerController/settingsController');
const { ensureAuthenticated } = require('../../middlewares/authMiddleware');

const router = express.Router();

// Route trang dashboard
router.get('/', ensureAuthenticated, (req, res) => {
  
  renderPartnerDashboard(req, res);
});


// Route tạo tour
router.post('/tours/create', ensureAuthenticated, createNewTour);

// Route cập nhật tour
router.post('/tours/:id/edit', ensureAuthenticated, updateExistingTour);

// Route danh sách tour
router.get('/tours', ensureAuthenticated, viewTours);

// Hiển thị trang cài đặt
router.get('/settings', ensureAuthenticated, renderSettings);

// Cập nhật thông tin cá nhân
router.post('/settings/update', ensureAuthenticated, updatePersonalInfo);

// Thêm email mới
router.post('/settings/add-email', ensureAuthenticated, addEmail);

// Thêm số điện thoại mới
router.post('/settings/add-phone', ensureAuthenticated, addPhone);


module.exports = router;
