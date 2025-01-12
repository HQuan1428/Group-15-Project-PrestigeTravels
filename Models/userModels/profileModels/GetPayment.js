const { db } = require('../../Connect_Server/db')
async function GetBookingsAndPayments(userId) {
    const query = `
        SELECT 
            b.id AS booking_id,
            b.tour_id,
            b.adults,
            b.children,
            b.total_price,
            b.status AS booking_status,
            b.created_at AS booking_date,
            t.title AS tour_title,
            t.description AS tour_description,
            t.price AS tour_price,
            p.amount AS payment_amount,
            p.payment_method,
            p.transaction_id,
            p.status AS payment_status,
            p.created_at AS payment_date
        FROM bookings b
        LEFT JOIN tours t ON b.tour_id = t.id
        LEFT JOIN payments p ON b.id = p.booking_id
        WHERE b.user_id = $1
    `;
    const results = await db.query(query, [userId]);
    return results;
}

module.exports={GetBookingsAndPayments}
