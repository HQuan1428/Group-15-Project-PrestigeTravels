const { db } = require('../../Connect_Server/db');

async function DetailApproval(id) {
    try {
        // Truy vấn với tham số truyền vào
        const res = await db.query(
            `
            SELECT *
            FROM "tours" 
            WHERE "id" = $1
            `, 
            [id] 
        );
        
        return res[0]; 
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error; 
    }
}

module.exports = { DetailApproval };
