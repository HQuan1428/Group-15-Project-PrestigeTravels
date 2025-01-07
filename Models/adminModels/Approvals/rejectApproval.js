const { db } = require('../../Connect_Server/db');

async function rejectApprovals(id) {
    try {
        // Thêm câu lệnh ORDER BY để sắp xếp status = 'inactive' lên trên
        const res = await db.query(`
            UPDATE tours
            SET status = 'active'
            WHERE id = $1
            RETURNING *`, [id]);
        
        return res.rows; // Returning the updated rows
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error; 
    }
}

module.exports = { rejectApprovals };
