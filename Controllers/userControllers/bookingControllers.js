// controllers/bookingController.js
const { createBooking, getTourPrice } = require('../../Models/userModels/userModels');

async function bookTour(req, res) {
    try {
        const tour_id = req.params.id;
        //console.log(tour_id);
        const { adults, children } = req.body;
        //console.log(adults, children )

        const userId = req.session.id; 
        console.log(userId);

        // Lấy giá tour từ hàm getTourPrice
        const tourPrice = await getTourPrice(tour_id); // Lấy giá từ tourId

        if (!tourPrice) {
            return res.status(404).send('Tour không tồn tại');
        }

        // Tính tổng giá
        const totalPrice = (adults * tourPrice) + (children * (tourPrice * 0.5)); // Giả sử trẻ em có giá bằng 50% giá người lớn

        // Tạo booking
        const booking = await createBooking(userId, tour_id, tourDateId, adults, children, totalPrice);

        // Chuyển hướng hoặc trả về thông báo thành công
        res.redirect(`/customer/bookings/${booking.id}`); // Chuyển đến trang chi tiết booking
    } catch (error) {
        console.error('Error booking tour:', error);
        res.status(500).send('Đặt tour thất bại!');
    }
}

module.exports = { bookTour };
