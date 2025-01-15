const { db } = require('../../Models/Connect_Server/db')

async function GetLocation() {
    try {
        // Truy vấn để lấy tất cả các địa điểm
        const locationResult = await db.query('SELECT * FROM "locations" LIMIT 5');
        const locations = locationResult;

        // Lặp qua từng địa điểm để lấy các tour tương ứng
        for (let location of locations) {
            const tourResult = await db.query(
                `SELECT t.*, 
                        (
                            SELECT json_agg(image_url) 
                            FROM tour_images ti 
                            WHERE ti.tour_id = t.id AND ti.is_main = true
                        ) AS image
                 FROM "tours" t
                 JOIN "tour_locations" tl ON t.id = tl.tour_id
                 WHERE tl.location_id = $1`, 
                [location.id]
            );
            
            // Gắn thông tin các tour vào đối tượng location
            location.tours = tourResult.map(tour => ({
                ...tour,
                image: tour.image ? tour.image[0] : '/default-image.jpg' // Đặt ảnh mặc định nếu không có ảnh
            }));
        }

        return locations;
    } catch (error) {
        console.error('Error executing query', error.stack);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}
async function createBooking(userId, tour_id, adults, children, totalPrice,available_date) {
    try {
        const result = await db.query(
            `INSERT INTO "bookings" ("user_id", "tour_id", "adults", "children", "total_price","available_date",
             "status"  )
             VALUES ($1, $2, $3, $4, $5,$6, 'pending') RETURNING *`,
            [userId, tour_id, adults, children, totalPrice,available_date]
        );
        return result[0];
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}
async function getTourPrice(tourId) {
    console.log(tourId);
    try {
        const result = await db.query(
            `SELECT "price" FROM "tours" WHERE "id" = $1`,
            [tourId]
        );
        if (result.length > 0) {
            return result[0].price; // Trả về giá của tour
        } else {
            console.error(`Tour with ID ${tourId} not found`);
            throw new Error('Tour not found');
        }
    } catch (error) {
        console.error('Error getting tour price:', error.message);
        throw error;
    }
}

async function getTourDetailsWithDates(tourId) {
    try {
        const tour = await db.oneOrNone(
            `
            SELECT 
                t.id, 
                t.title, 
                t.price,
                (
                    SELECT json_agg(json_build_object('id', td.id, 'date', td.available_date, 'slots', td.slots_available))
                    FROM tour_dates td
                    WHERE td.tour_id = t.id
                ) AS available_dates
            FROM tours t
            WHERE t.id = $1
            `,
            [tourId]
        );
        return tour;
    } catch (error) {
        console.error('Error getting tour details with dates:', error);
        throw error;
    }
}


// lấy các phương thức thành toán 
async function get_pay_methods()
{
    try
    {
        let methods = await db.query(`SELECT id, name
                                    FROM payment_methods
                                    WHERE is_active = TRUE`);
        return methods
    }
    catch (error)
    {
        console.error('Error: ', error);
        throw error;
    }
}


// Lấy thông tin booking
async function get_booking_info(tour_id, user_id)
{
    try
    {
        let tour_info = await db.query(`SELECT * 
                                    FROM bookings 
                                    WHERE tour_id = $1 AND user_id = $2
                                    ORDER BY id DESC
                                    `, [tour_id, user_id]);
        
        return tour_info;
    }
    catch (error)
    {
        console.error('Error: ', error);
        throw error;
    }
}

// Create payment
async function createPayment(booking_id, price, method, datetime) {
    try
    {
        const result = await db.query(`
        INSERT INTO payments (booking_id, amount, payment_method, transaction_id, status, created_at)
        VALUES ($1, $2, $3, $4, 'pending', $5) RETURNING *
                                    `, [booking_id, price, method, ' ', datetime]);

        return result[0];
    }
    catch (error)
    {
        console.error('Error: ', error);
        throw error;
    }
}

async function getPaymentInfo(booking_id) {
    try
    {
        let tour_info = await db.query(`
            SELECT 
                id, 
                booking_id, 
                amount, 
                payment_method, 
                transaction_id, 
                status, 
                created_at
            FROM 
                public.payments
            WHERE 
                booking_id = $1`, [booking_id]);
        
        return tour_info;
    }
    catch (error)
    {
        console.error('Error: ', error);
        throw error;
    }
}

// Get discount infomation
async function getDiscountInfo(discountCode) {
    
}


module.exports = {
    GetLocation,
    createBooking,
    getTourPrice,
    getTourDetailsWithDates,
    get_pay_methods,
    get_booking_info,
    createPayment,
    getPaymentInfo,
}