const {get_pay_methods, get_booking_info, createPayment, getPaymentInfo } = require('../../Models/userModels/userModels')
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

    return formattedTime;
}

// xử lý discount
const discountPercent = (discountCode) => {
    
}


const renderPayment = async (req, res) => {
    try {
        // Lấy phương thức thanh toán
        const methods = await get_pay_methods();

        const tour_id = req.params.id;
        const user_id = req.session.user_id;

        console.log(user_id);

        // Lấy thông tin booking
        const booking_info = await get_booking_info(tour_id, user_id);
        console.log(booking_info);

        // Kiểm tra nếu không tìm thấy thông tin booking
        if (!booking_info || booking_info.length === 0) {
            return res.status(404).json({ message: 'Thông tin booking không tồn tại.' });
        }

        // Lấy chi tiết tour
        const detail = await DetailApproval(tour_id);

        // Render trang payment
        res.render('userViews/payment', {
            tour_id: tour_id,
            methods: methods,
            detail: detail,
            total_price: booking_info[0].total_price
        });
    } catch (error) {
        // Xử lý lỗi nếu có sự cố
        console.error('Error during payment rendering:', error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin thanh toán.' });
    }
};


const renderPayInfo = async (req, res) => {
    const tour_id = req.params.id;
    const user_id = req.session.user_id;

    try {
        console.log(user_id);

        // Lấy thông tin booking
        const booking_info = await get_booking_info(tour_id, user_id);
        console.log(booking_info);

        // Kiểm tra nếu không tìm thấy thông tin booking
        if (!booking_info || booking_info.length === 0) {
            return res.status(404).json({ message: 'Thông tin booking không tồn tại.' });
        }

        // Lấy chi tiết tour
        const detail = await DetailApproval(tour_id);

        // Get booking_id tour
        const booking_id = booking_info[0].id;

        // Lấy thông tin từ form 
        const { paymentMethod, discountCode } = req.body;
        
        // Lấy thời gian
        const dateTime = getDateTime();

        // Thêm thông tin thanh toán
        const payment_info = await createPayment(booking_id, booking_info[0].total_price, paymentMethod, dateTime);
        
        // Số lượng khách
        const numbers = booking_info[0].adults + booking_info[0].children;

        res.render('userViews/payment2', {
            detail: detail,
            paymentInfo: payment_info,
            bankAccount: '1032985921',
            numbers: numbers,
            tour_id: tour_id,
            dateTime: dateTime,
            status: booking_info[0].status,
        });
    } catch (error) {
        // Xử lý lỗi nếu có sự cố
        console.error('Error during payment information rendering:', error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin thanh toán.' });
    }
};


const statePayment = async (req, res) => {
    const tour_id = req.params.id;
    const user_id = req.session.user_id;

    try {
        // Giả sử bạn có một mô hình database như sau:
        const booking_info = await get_booking_info(tour_id, user_id);

        // Kiểm tra nếu booking_info có dữ liệu
        if (booking_info && booking_info.length > 0) {
            // Trả về trạng thái thanh toán
            res.json({ status: booking_info[0].status });
        } else {
            // Trường hợp không tìm thấy thông tin thanh toán
            res.status(404).json({ message: 'Không tìm thấy thông tin thanh toán.' });
        }
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ vấn đề gì trong quá trình lấy thông tin
        console.error('Error fetching payment status:', error);
        res.status(500).json({ message: 'Lỗi khi lấy trạng thái thanh toán.' });
    }
};



module.exports = {
    renderPayment,
    renderPayInfo,
    statePayment,
};