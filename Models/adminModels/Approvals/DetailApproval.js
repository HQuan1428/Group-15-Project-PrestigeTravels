const { db } = require('../../Connect_Server/db');

async function DetailApproval(id) {
    try {
        const res = await db.query(
            `
            SELECT DISTINCT ON (td.available_date) t.*, td.*
            FROM "tours" t
            LEFT JOIN "tour_dates" td ON t.id = td.tour_id
            WHERE t.id = $1
            ORDER BY td.available_date ASC
            `,
            [id]
        );
        if (res.length > 0) {
            const detail = res[0];
            // Định dạng ngày dd/mm/yyyy
            if (detail.available_date) {
                const date = new Date(detail.available_date);
                detail.available_date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            }

            return detail;
        }
        
        return res[0]; // Trả về danh sách các tour không bị trùng
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error;
    }
}


module.exports = { DetailApproval };
