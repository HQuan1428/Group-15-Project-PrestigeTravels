const { db } = require('../../Connect_Server/db')
async function GetBookTour(id) {
    const bookTour = await db.query(`
        SELECT 
            b.id AS booking_id,
            b.user_id,
            b.tour_id,
            t.title,
            t.description,
            t.price,
            b.adults,
            b.children,
            b.total_price,
            b.status AS booking_status,
            b.created_at AS booking_date
        FROM 
            bookings b
        JOIN 
            tours t ON b.tour_id = t.id
        WHERE 
            b.user_id = $1
    `, [id]);
    return bookTour;
}

module.exports={GetBookTour}
