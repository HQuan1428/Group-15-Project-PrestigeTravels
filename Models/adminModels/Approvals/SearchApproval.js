const {db} = require('../../Connect_Server/db'); // Kết nối CSDL

async function getApprovalByName(name) {
    const query = `
        SELECT *
        FROM "tours" 
        WHERE LOWER("title") LIKE LOWER($1)`;
    const values = [`%${name}%`];

    try {
        const result = await db.query(query, values);
        return result;
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error;
    }
}
module.exports = { getApprovalByName };
