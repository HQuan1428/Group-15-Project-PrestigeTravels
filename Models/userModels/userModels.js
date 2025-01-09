const { db } = require('../../Models/Connect_Server/db')

async function GetLocation() {
    try {
        // Truy vấn để lấy tất cả các địa điểm
        const locationResult = await db.query('SELECT * FROM "locations" LIMIT 5');
        //console.log(locationResult);
        // Lấy danh sách các địa điểm từ kết quả truy vấn
        const locations = locationResult;

        // Lặp qua từng địa điểm để lấy các tour tương ứng
        for (let location of locations) {
            // Truy vấn để lấy các tour tương ứng với mỗi địa điểm
            const tourResult = await db.query(
                `SELECT t.* 
                 FROM "tours" t
                 JOIN "tour_locations" tl ON t.id = tl.tour_id
                 WHERE tl.location_id = $1`, 
                [location.id]
            );
            
            // Gắn thông tin các tour vào đối tượng location
            location.tours = tourResult;
        }
       // console.log(locations)

        // Trả về danh sách các địa điểm và tour của chúng
        return locations;
    } catch (error) {
        console.error('Error executing query', error.stack);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}
async function createBooking(userId, tourId, tourDateId, adults, children, totalPrice) {
    try {
        const result = await db.query(
            `INSERT INTO "bookings" ("user_id", "tour_id", "tour_date_id", "adults", "children", "total_price", "status")
             VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING *`,
            [userId, tourId, tourDateId, adults, children, totalPrice]
        );
        return result[0];
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}
async function getTourPrice(tourId) {
    //console.log(tourId);
    try {
        const result = await db.query(
            `SELECT "price" FROM "tours" WHERE "id" = $1`,
            [tourId]
        );
        if (result.length > 0) {
            return result[0].price; // Trả về giá của tour
        } else {
            throw new Error('Tour not found');
        }
    } catch (error) {
        console.error('Error getting tour price:', error);
        throw error;
    }
}



module.exports={GetLocation,createBooking,getTourPrice}