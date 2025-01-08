const { db } = require('../../Connect_Server/db'); // Kết nối CSDL

// Hàm xóa người dùng theo id
async function acceptApprovalById(id) {
    try {
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
module.exports = { acceptApprovalById };
