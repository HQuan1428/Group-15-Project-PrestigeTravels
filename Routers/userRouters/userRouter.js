const express = require('express')
const router = express.Router()
const { GetLocation, get_pay_methods, get_booking_info } = require('../../Models/userModels/userModels')
const{DetailTour}=require('../../Controllers/userControllers/detailControllers')
const { getAvailableDates, getTourPrice } = require('../../Models/userModels/getAvailabledateById')
const { db } = require('../../Models/Connect_Server/db')
const fs = require('fs').promises;
const path = require('path');

router.get('/customer', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Nếu chưa đăng nhập, chuyển đến trang login
  }
  const location = await GetLocation()
  //console.log(location)
  const role = req.session.userType

  res.render('userViews/home', { user: req.user,role,location})
})

router.get('/customer/tours/:id', DetailTour)
router.get('/customer/booking/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    const tour_id = req.params.id;

    try {
        // Debug để xem tour_id
        console.log('Tour ID:', tour_id);

        // Lấy thông tin tour và ngày có sẵn
        const tourQuery = await db.query(
            `SELECT t.price, 
                    array_agg(td.available_date ORDER BY td.available_date) as dates
             FROM tours t
             LEFT JOIN tour_dates td ON t.id = td.tour_id
             WHERE t.id = $1 AND td.slots_available > 0
             GROUP BY t.id, t.price`,
            [tour_id]
        );

        // Debug kết quả query
        console.log('Query result:', tourQuery);

        if (!tourQuery || tourQuery.length === 0) {
            throw new Error('Không tìm thấy thông tin tour');
        }

        const { price, dates } = tourQuery[0];
        
        // Format lại ngày để hiển thị
        const formattedDates = dates ? dates.map(date => {
            return new Date(date).toISOString().split('T')[0];
        }) : [];

        // Debug dữ liệu trước khi render
        console.log('Data to render:', {
            tour_id,
            availableDates: formattedDates,
            tourPrice: parseFloat(price)
        });

        res.render('userViews/bookingTour', {
            tour_id,
            availableDates: formattedDates,
            tourPrice: parseFloat(price) // Chuyển đổi sang số thập phân
        });

    } catch (error) {
        console.error('Chi tiết lỗi:', error);
        res.status(500).send('Có lỗi xảy ra khi lấy thông tin tour: ' + error.message);
    }
});


const {bookTour}=require('../../Controllers/userControllers/bookingControllers')
router.post('/customer/bookings/order/:id', bookTour)

// payment
const paymentControllers = require('../../Controllers/userControllers/paymentControllers')
router.get('/customer/payment/:id', paymentControllers.renderPayment);
// chuyển tiền
router.post('/customer/payment/:id/create', paymentControllers.renderPayInfo);
// kiểm tra tình trạng thanh toán 
router.get('/status/:id', paymentControllers.statePayment);

//profile 
const {showProfile,showBookingTour,showPayment}=require('../../Controllers/userControllers/showProfileControllers')
router.get('/customer/profile', showProfile)

//show detail account 
const{showdetailAcoount}=require('../../Controllers/userControllers/detailAccountControllers')
router.get('/customer/profile/account', showdetailAcoount)
//show booking tour 
router.get('/customer/profile/tour', showBookingTour)
//show trasistion 
router.get('/customer/profile/transistion',showPayment)

// Thêm route cho trang thông báo
router.get('/customer/profile/notification', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }

    try {
        // Lấy thông báo từ database
        const notifications = await db.query(`
            SELECT n.*, 
                   CASE 
                     WHEN n.created_at > NOW() - INTERVAL '24 hours' THEN 'new'
                     ELSE 'old'
                   END as age
            FROM notifications n
            WHERE n.user_id = $1
            ORDER BY n.created_at DESC
        `, [req.user.id]);

        res.render('userViews/notification', {
            user: req.user,
            notifications: notifications,
            helpers: {
                formatDate: function(date) {
                    return new Date(date).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                },
                eq: function(a, b) {
                    return a === b;
                }
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông báo:', error);
        res.status(500).send('Có lỗi xảy ra khi lấy thông báo');
    }
});

// Route để đánh dấu thông báo đã đọc
router.post('/customer/notifications/:id/read', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        await db.query(
            'UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2',
            [req.params.id, req.user.id]
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái thông báo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Thêm route cho chatbot
router.get('/customer/chat', async (req, res) => {
    res.render('userViews/Chat/chat');
});

// Route để đọc file chat patterns
router.get('/customer/chat/patterns', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../Views/userViews/Chat/chat.txt');
        const content = await fs.readFile(filePath, 'utf8');
        res.json({ success: true, data: content });
    } catch (error) {
        console.error('Error reading chat patterns:', error);
        res.status(500).json({ success: false, error: 'Could not load chat patterns' });
    }
});

module.exports = router
