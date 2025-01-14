const { db } = require('../Connect_Server/db');

async function getCoupons() {
    try {
        const result = await db.query(`
            SELECT c.*, t.title as tour_name 
            FROM coupons c
            LEFT JOIN tours t ON c.tour_id = t.id
            WHERE c.end_date >= CURRENT_DATE
            ORDER BY c.created_at DESC
        `);
        return result;
    } catch (error) {
        console.error('Error getting coupons:', error);
        throw error;
    }
}

module.exports = {
    getCoupons
}