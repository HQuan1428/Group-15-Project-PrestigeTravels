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
  uploadFields,
  upload,
  addTour,
  renderTours,
  renderAddTourForm,
  createNewTour,
  renderEditTourForm,
  updateTour,
  deleteTour,
  renderTourDetails,
} = require('../../Controllers/providerController/toursController');

const { 
  renderOrders, 
  renderOrderDetails, 
  updateOrder ,
  acceptOrder
} = require('../../Controllers/providerController/ordersController');

const { getRevenueByDate } = require('../../Models/providerModels/revenueStatisticsModel');

const {
  getDailyRevenue,
  getMonthlyRevenue,
  getYearlyRevenue,
} = require('../../Controllers/providerController/revenueStatisticsController');

const {
  renderFAQs,
  createFAQ,
  editFAQ,
  removeFAQ
} = require('../../Controllers/providerController/faqsController');
const PromotionsController = require('../../Controllers/providerController/promotionsController');

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
router.post('/tours/add', uploadFields, addTour);
// Route hiển thị chi tiết tour
router.get('/tours/:id', renderTourDetails);
router.get('/tours/:id/edit', ensureAuthenticated, renderEditTourForm);
router.post('/tours/:id/edit', uploadFields, updateTour);

router.post('/tours/:id/delete', ensureAuthenticated, deleteTour);


// Danh sách đơn hàng
router.get('/orders', ensureAuthenticated, renderOrders);

// Chi tiết đơn hàng
router.get('/orders/:id', ensureAuthenticated, renderOrderDetails);
// Route chấp nhận đơn hàng
router.post('/orders/:id/accept', ensureAuthenticated, acceptOrder);

// Cập nhật trạng thái đơn hàng
router.post('/orders/:id/update', ensureAuthenticated, updateOrder);

// Route lấy doanh thu theo ngày
router.get('/revenue', ensureAuthenticated, async (req, res) => {
    try {
        const { fromDate, toDate, serviceCode } = req.query;
        const partnerId = req.session.partner_id; // Lấy partner_id từ session

        console.log('Filter params:', { fromDate, toDate, serviceCode, partnerId }); // Debug log

        const revenue = await getRevenueByDate(partnerId, fromDate, toDate, serviceCode);
        
        // Chuyển đổi dữ liệu sang JSON để sử dụng trong template
        const revenueJSON = JSON.stringify(revenue);

        res.render('providerViews/revenueStatistics', {
            layout: 'main',
            role: 'partner',
            revenue: revenue || [],
            json: revenueJSON, // Thêm dữ liệu JSON cho biểu đồ
            fromDate,
            toDate,
            serviceCode
        });
    } catch (error) {
        console.error('Route error:', error);
        res.status(500).send('Không thể tải trang thống kê doanh thu: ' + error.message);
    }
});

// API routes
router.get('/revenue/api/daily', ensureAuthenticated, getDailyRevenue);
router.get('/revenue/api/monthly', ensureAuthenticated, getMonthlyRevenue);
router.get('/revenue/api/yearly', ensureAuthenticated, getYearlyRevenue);

// Route cho trang thống kê
router.get('/statistics', (req, res) => {
    res.render('provider/statistics'); // Render view statistics
});

// Thêm routes cho khuyến mãi
// Hiển thị trang khuyến mãi
router.get('/promotions', ensureAuthenticated, PromotionsController.renderPromotions);

// Thêm khuyến mãi mới
router.post('/promotions/add', ensureAuthenticated, (req, res, next) => {
    console.log('Middleware - User check:', req.user);
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: User not found'
        });
    }
    next();
}, PromotionsController.addPromotion);

// Xóa khuyến mãi
router.post('/promotions/:id/delete', ensureAuthenticated, PromotionsController.deletePromotion);

// Cập nhật khuyến mãi
router.post('/promotions/:id/update', ensureAuthenticated, PromotionsController.updatePromotion);

router.get('/promotions/:id', PromotionsController.getPromotionById);
router.put('/promotions/:id', PromotionsController.updatePromotion);
router.delete('/promotions/:id', PromotionsController.deletePromotion);

// Hiển thị danh sách FAQs
router.get('/support', ensureAuthenticated, renderFAQs);

// Thêm FAQ mới
router.post('/support/add', ensureAuthenticated, createFAQ);

// Cập nhật FAQ
router.post('/support/:id/edit', ensureAuthenticated, editFAQ);

// Xóa FAQ
router.post('/support/:id/delete', ensureAuthenticated, removeFAQ);

module.exports = router;
