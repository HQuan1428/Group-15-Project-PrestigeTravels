const {get_pay_methods, get_booking_info, createPayment } = require('../../Models/userModels/userModels')
const {DetailApproval}=require('../../Models/adminModels/Approvals/DetailApproval')
const axios = require('axios');


// lấy thời điểm
const getDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11, nên cần +1
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    console.log(formattedTime);

    return formattedTime;
}

// xử lý discount
const discountPercent = (discountCode) => {
    
}


// Render trang payment
const renderPayment = async (req, res) => 
{
    // Lấy phương phức thành toán
    const methods = await get_pay_methods();

    const tour_id = req.params.id;
    const user_id = req.session.user_id;

    console.log(user_id);

    // Lấy thông tin booking
    const booking_info = await get_booking_info(tour_id, user_id);
    console.log(booking_info);

    // Lấy chi tiết tour
    const detail = await DetailApproval(tour_id);

    // Get booking_id tour
    const booking_id = booking_info[0].id;
    //console.log(booking_id);

    // lấy thông tin từ form 
    const { paymentMethod, discountCode } = req.body;
    
    // Lấy thời gian
    const dateTime = getDateTime();

    // Thêm thông tin thành toán 
    const payment_info = createPayment(booking_id, booking_info[0].total_price, paymentMethod, dateTime);
    
    console.log(payment_info)

    res.render('userViews/payment', {
        tour_id: tour_id,
        methods: methods,
        detail: detail,
        total_price: booking_info[0].total_price
    });
}





module.exports = {
    renderPayment,
};