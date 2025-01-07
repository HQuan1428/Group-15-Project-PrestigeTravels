const express = require('express');
const { renderPartnerDashboard} = require('../../Controllers/providerController/providerControllers');
const { renderSettings, updatePersonalInfo, addEmail, addPhone } = require('../../Controllers/providerController/settingsController');
const { ensureAuthenticated } = require('../../middlewares/authMiddleware');
const {
  renderServices,
  renderAddServiceForm,
  createService,
  renderEditServiceForm,
  updateService,
  deleteService
} = require('../../Controllers/providerController/servicesController');

const {
  renderTours,
  renderAddTourForm,
  createNewTour,
  renderEditTourForm,
  updateTour,
  deleteTour,
} = require('../../Controllers/providerController/toursController');


const router = express.Router();

// Route trang dashboard
router.get('/', ensureAuthenticated, (req, res) => {
  
  renderPartnerDashboard(req, res);
});






// Hiển thị trang cài đặt
router.get('/settings', ensureAuthenticated, renderSettings);

// Cập nhật thông tin cá nhân
router.post('/settings/update', ensureAuthenticated, updatePersonalInfo);

// Thêm email mới
router.post('/settings/add-email', ensureAuthenticated, addEmail);

// Thêm số điện thoại mới
router.post('/settings/add-phone', ensureAuthenticated, addPhone);
// Route quản lý dịch vụ
router.get('/services', ensureAuthenticated, renderServices);

// Route hiển thị form thêm dịch vụ
router.get('/services/add', ensureAuthenticated, renderAddServiceForm);

// Route xử lý thêm dịch vụ
router.post('/services/add', ensureAuthenticated, createService);

// Route hiển thị form chỉnh sửa dịch vụ
router.get('/services/:id/edit', ensureAuthenticated, renderEditServiceForm);

// Route xử lý cập nhật dịch vụ
router.post('/services/:id/edit', ensureAuthenticated, updateService);

// Route xóa dịch vụ
router.post('/services/:id/delete', ensureAuthenticated, deleteService);

// Route quản lý tour
router.get('/tours', ensureAuthenticated, renderTours);
router.get('/tours/add', ensureAuthenticated, renderAddTourForm);
router.post('/tours/add', ensureAuthenticated, createNewTour);
router.get('/tours/:id/edit', ensureAuthenticated, renderEditTourForm);
router.post('/tours/:id/edit', ensureAuthenticated, updateTour);
router.post('/tours/:id/delete', ensureAuthenticated, deleteTour);

module.exports = router;
