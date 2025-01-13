const express = require('express')
const router = express.Router()
const { GetLocation, get_pay_methods, get_booking_info } = require('../../Models/userModels/userModels')
const{DetailTour}=require('../../Controllers/userControllers/detailControllers')
const { getAvailableDates}=require('../../Models/userModels/getAvailabledateById')

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
    return res.redirect('/login'); // Nếu chưa đăng nhập, chuyển đến trang login
  }
  const tour_id = req.params.id;
  //console.log(tour_id);

  // Sử dụng await để đợi kết quả từ hàm bất đồng bộ getAvailableDates
  try {
    const availableDates = await getAvailableDates(tour_id);
    //console.log(availableDates);  // Bây giờ bạn sẽ thấy kết quả thay vì Promise

    res.render('userViews/bookingTour', { tour_id, availableDates });
  } catch (error) {
    console.error('Lỗi khi lấy ngày khả dụng:', error);
    res.status(500).send('Có lỗi xảy ra khi lấy ngày khả dụng.');
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
const {showProfile}=require('../../Controllers/userControllers/showProfileControllers')
router.get('/customer/profile', showProfile)

//show detail account 
const{showdetailAcoount}=require('../../Controllers/userControllers/detailAccountControllers')
router.get('/customer/account',showdetailAcoount)
module.exports = router
