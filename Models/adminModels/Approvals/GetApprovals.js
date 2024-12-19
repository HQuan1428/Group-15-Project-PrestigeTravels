const { db } = require('../../Connect_Server/db');

async function GetApprovals() {
    try {
        // Thêm câu lệnh ORDER BY để sắp xếp status = 'inactive' lên trên
        const res = await db.query('SELECT * FROM "tours" ORDER BY "status" = \'inactive\' DESC');
        return res.rows; // Trả về res.rows để lấy dữ liệu kết quả từ truy vấn
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error; // Ném lỗi ra ngoài nếu có
    }
}

module.exports = { GetApprovals };
