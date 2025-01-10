const express = require('express')
const router = express.Router()
const { GetLocation, get_pay_methods, getTourPrice } = require('../../Models/userModels/userModels')
const{DetailTour}=require('../../Controllers/userControllers/detailControllers')
const {DetailApproval}=require('../../Models/adminModels/Approvals/DetailApproval')


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
router.get('/customer/booking/:id', (req, res) => {
  const tour_id = req.params.id;
  //console.log(tour_id)
  res.render('userViews/bookingTour',{tour_id})

})

const {bookTour}=require('../../Controllers/userControllers/bookingControllers')
router.post('/customer/bookings/order/:id', bookTour)


// payment
router.get('/customer/payment/:id', async (req, res) => {
  const methods = await get_pay_methods()
  
  const tour_id = req.params.id;
  const detail = await DetailApproval(tour_id);

  const total_price = await getTourPrice(tour_id);


  res.render('userViews/payment', {methods: methods, detail: detail, total_price: total_price})
})

//profile 
const {showProfile}=require('../../Controllers/userControllers/showProfileControllers')
router.get('/customer/profile', showProfile)

//show detail account 
const{showdetailAcoount}=require('../../Controllers/userControllers/detailAccountControllers')
router.get('/customer/account',showdetailAcoount)
module.exports = router
