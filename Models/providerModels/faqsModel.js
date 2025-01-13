const { db } = require('../Connect_Server/db');

// Lấy danh sách FAQs của nhà cung cấp
async function getFAQs(partnerId) {
    return db.manyOrNone(
        `SELECT * FROM faqs 
         WHERE tour_id IN (
             SELECT id FROM tours WHERE partner_id = $1
         ) ORDER BY order_index ASC`,
        [partnerId]
    );
}

// Thêm FAQ mới
async function addFAQ(partnerId, question, answer) {
    const tourId = await db.oneOrNone(
        `SELECT id FROM tours WHERE partner_id = $1 LIMIT 1`,
        [partnerId]
    );

    return db.none(
        `INSERT INTO faqs (tour_id, question, answer, order_index) 
         VALUES ($1, $2, $3, 
         (SELECT COALESCE(MAX(order_index), 0) + 1 FROM faqs WHERE tour_id = $1))`,
        [tourId.id, question, answer]
    );
}

// Cập nhật FAQ
async function updateFAQ(id, question, answer) {
    return db.none(
        `UPDATE faqs 
         SET question = $1, answer = $2 
         WHERE id = $3`,
        [question, answer, id]
    );
}

// Xóa FAQ
async function deleteFAQ(id) {
    return db.none(`DELETE FROM faqs WHERE id = $1`, [id]);
}

module.exports = { getFAQs, addFAQ, updateFAQ, deleteFAQ };
