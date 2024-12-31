const { db } = require('../../Connect_Server/db');

async function GetApprovals() {
    try {
        // Thêm câu lệnh ORDER BY để sắp xếp status = 'inactive' lên trên
        const res = await db.query(`
            SELECT tours.*, partners.*,tours.id
            FROM "tours" AS tours
            JOIN "partners" AS partners ON tours.partner_id = partners.id
            ORDER BY tours.status = 'inactive' DESC
        `);
        return res; // Trả về res.rows để lấy dữ liệu kết quả từ truy vấn
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error; // Ném lỗi ra ngoài nếu có
    }
}
module.exports = { GetApprovals };
