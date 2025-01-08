const { db } = require('../../Connect_Server/db');

async function rejectApprovals(id) {
    try {
       
        // Xóa trong bảng tours
        const res = await db.query('DELETE FROM "tours" WHERE id = $1 RETURNING *', [id]);

        return res.rows;
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error;
    }
}


module.exports = { rejectApprovals };
