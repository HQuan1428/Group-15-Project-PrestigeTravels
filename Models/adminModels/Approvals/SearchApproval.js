const {db} = require('../../Connect_Server/db'); // Kết nối CSDL

async function getApprovalByName(name) {
    const query = `
        SELECT tours.*, 
               partners.*, 
               tours.id, 
               tours.status AS tour_status
        FROM "tours" AS tours
        JOIN "partners" AS partners 
        ON tours.partner_id = partners.id
        WHERE LOWER(tours.title) LIKE LOWER($1)
    `;
    const values = [`%${name}%`];

    try {
        const result = await db.query(query, values);
        return result; // Trả về toàn bộ kết quả
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error;
    }
}

module.exports = { getApprovalByName };
