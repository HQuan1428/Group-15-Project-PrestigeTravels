const { db } = require('../../Connect_Server/db');

async function GetSystem() {
    try {
        const res = await db.query(`
            SELECT *
            FROM "system_status"
        `);
        return res;
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error; // Ném lỗi ra ngoài nếu có
    }
}
module.exports = { GetSystem };
