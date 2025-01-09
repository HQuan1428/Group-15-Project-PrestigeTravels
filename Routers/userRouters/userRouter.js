const express = require('express')
const router = express.Router()
const { GetLocation } = require('../../Models/userModels/userModels')
const{DetailTour}=require('../../Controllers/userControllers/detailControllers')
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
router.post('/customer/booking/order/:id', bookTour )

module.exports = router
