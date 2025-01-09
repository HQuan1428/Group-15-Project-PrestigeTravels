// controllers/bookingController.js
const { createBooking, getTourPrice,getTourDetailsWithDates } = require('../../Models/userModels/userModels');

async function bookTour(req, res) {
    try {
        const tour_id = req.params.id;
        console.log(tour_id);
        const {adults, children } = req.body;

        const userId = req.session.user_id; 

        // Kiểm tra ID tour trước khi lấy giá
        if (!tour_id) {
            return res.status(400).send('Tour ID is missing');
        }

        // Lấy giá tour
        const tourPrice = await getTourPrice(tour_id);

        if (!tourPrice) {
            return res.status(404).send('Tour không tồn tại');
        }

        // Tính tổng giá
        const totalPrice = (adults * tourPrice) + (children * (tourPrice * 0.5));

        // Tạo booking
        const booking = await createBooking(userId, tour_id, adults, children, totalPrice);

        // Chuyển hướng hoặc trả về thông báo thành công
        res.redirect('/customer'); // Chuyển đến trang chi tiết booking
    } catch (error) {
        console.error('Error booking tour:', error.message);
        res.status(500).send('Đặt tour thất bại! ' + error.message);
    }
}


async function DetailTour(req, res) {
    try {
        const tour_id = req.params.id;

        const tour = await db.oneOrNone(
            `
            SELECT 
                t.id, 
                t.title, 
                t.price,
                (
                    SELECT json_agg(
                        json_build_object(
                            'id', td.id,
                            'date', td.available_date,
                            'slots', td.slots_available
                        )
                    )
                    FROM tour_dates td
                    WHERE td.tour_id = t.id
                ) AS available_dates
            FROM tours t
            WHERE t.id = $1
            `,
            [tour_id]
        );

        if (!tour) {
            return res.status(404).send('Tour không tồn tại');
        }

        res.render('userViews/bookingTour', {
            tour_id: tour.id,
            available_dates: tour.available_dates
        });
    } catch (error) {
        console.error('Error fetching tour details:', error.message);
        res.status(500).send('Không thể lấy thông tin tour');
    }
}



module.exports = { bookTour ,DetailTour};
