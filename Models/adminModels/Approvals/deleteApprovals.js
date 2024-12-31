const { db } = require('../../Connect_Server/db'); // Kết nối CSDL

// Hàm xóa người dùng theo id
async function deleteApprovalById(id) {
    try {
        await db.query('DELETE FROM "tour_dates" WHERE "tour_id" = $1', [id]);

        return await db.query(`DELETE FROM "tours" WHERE "id" = $1`, [id]);
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error;
    }
}
module.exports = { deleteApprovalById };
