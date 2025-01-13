// controllers/bookingController.js
const { createBooking, getTourPrice } = require('../../Models/userModels/userModels');

async function bookTour(req, res) {
    try {
        const tour_id = req.params.id;
        const { 
            adults, 
            children, 
            available_date,
            contactName,
            contactEmail,
            contactPhone
        } = req.body;

        if (!tour_id) {
            return res.status(400).send('Tour ID is missing');
        }
        const userId = req.session.user_id;

        // Kiểm tra số lượng người lớn và trẻ em
        if (!adults || !children) {
            return res.status(400).send('Số lượng người lớn hoặc trẻ em không hợp lệ');
        }

        // Lấy giá tour
        const tourPrice = await getTourPrice(tour_id);

        if (!tourPrice) {
            return res.status(404).send('Tour không tồn tại');
        }

        // Tính tổng giá
        const totalPrice = (adults * tourPrice) + (children * (tourPrice * 0.5));

        // Tạo booking với thông tin liên hệ
        const booking = await createBooking(
            userId, 
            tour_id, 
            adults, 
            children, 
            totalPrice,
            available_date,
            contactName,
            contactEmail,
            contactPhone
        );

        if (!booking) {
            return res.status(500).send('Tạo booking thất bại');
        }

        res.redirect(`/customer/payment/${tour_id}`);
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
        if(!req.isAuthenticated())
    {
        return res.redirect('/login');
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
