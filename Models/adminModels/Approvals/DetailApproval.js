const { db } = require('../../Connect_Server/db');

async function DetailApproval(id) {
    try {
        const res = await db.query(
            `
            SELECT 
                t.id AS tour_id,
                t.title,
                t.price,
                t.description,
                t.duration,
                t.starting_point,
                t.image,
                t.max_participants,
                t.average_rating,
                t.cached_review_count,
                t.cached_booking_count,
                ARRAY_AGG(td.available_date ORDER BY td.available_date) AS available_dates
            FROM "tours" t
            LEFT JOIN "tour_dates" td ON t.id = td.tour_id
            WHERE t.id = $1
            GROUP BY t.id
            ORDER BY t.created_at DESC
            `,
            [id]
        );

        if (res.length > 0) {
            const detail = res[0];

            // Định dạng lại ngày trong mảng available_dates sang định dạng dd/mm/yyyy
            if (detail.available_dates && detail.available_dates.length > 0) {
                detail.available_dates = detail.available_dates.map(dateStr => {
                    const date = new Date(dateStr);
                    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                });
            }

            return detail;
        } else {
            throw new Error('Tour not found');
        }
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error;
    }
}



module.exports = { DetailApproval };
