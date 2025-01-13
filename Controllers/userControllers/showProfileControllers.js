const { getUserById } = require('../../Models/adminModels/Auth/adminModels')
const { GetScore } = require('../../Models/userModels/profileModels/GetScore')
const { GetBookTour } = require('../../Models/userModels/profileModels/GetBookTour')
const {GetBookingsAndPayments}=require('../../Models/userModels/profileModels/GetPayment')
const showProfile = async (req, res) => {
    if (!req.isAuthenticated()) {
           return res.redirect('/login'); 
    }
    const user_id = req.session.user_id;
    const user = await getUserById(user_id);
    const score = await GetScore(user_id) || 0;
    //console.log(user);
    const role = req.session.userType;
    res.render('userViews/infoAccount',{role,user,score})
}
const showBookingTour = async (req, res) => {
    if (!req.isAuthenticated()) {
           return res.redirect('/login'); 
    }
    const user_id = req.session.user_id;
    const bookTour = await GetBookTour(user_id) || [];
    const user = await getUserById(user_id);
    const score = await GetScore(user_id) || 0;
    //console.log(bookTour);
    const role = req.session.userType;
    res.render('userViews/profile/bookingtour_profile',{role,user,bookTour,score})
}
const showPayment = async (req, res) => {
    if (!req.isAuthenticated()) {
           return res.redirect('/login'); 
    }
    const user_id = req.session.user_id;
    const bookingsAndPayments = await GetBookingsAndPayments(user_id) || [];
    const user = await getUserById(user_id);
    const score = await GetScore(user_id) || 0;
    //console.log(bookingsAndPayments);
    const role = req.session.userType;
    res.render('userViews/profile/payment_profile',{role,user,bookingsAndPayments,score})
}


module.exports={showProfile,showBookingTour,showPayment}