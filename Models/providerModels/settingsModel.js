const { db } = require('../Connect_Server/db');

// Lấy thông tin nhà cung cấp
async function getPartnerByUserId(userId) {
    return db.oneOrNone('SELECT * FROM partners WHERE user_id = $1', [userId]);
}

// Cập nhật thông tin cá nhân
async function updatePartnerInfo(userId, data) {
    const { fullName, gender, dob, location } = data;
    return db.none(
        `UPDATE partners 
         SET representative_name = $1, position = $2, business_address = $3 
         WHERE user_id = $4`,
        [fullName, gender, location, userId]
    );
}

// Thêm email
async function addPartnerEmail(userId, email) {
    return db.none(
        `INSERT INTO partner_emails (partner_id, email) 
         VALUES ((SELECT id FROM partners WHERE user_id = $1), $2)`,
        [userId, email]
    );
}

// Thêm số điện thoại
async function addPartnerPhone(userId, phone) {
    return db.none(
        `INSERT INTO partner_phones (partner_id, phone) 
         VALUES ((SELECT id FROM partners WHERE user_id = $1), $2)`,
        [userId, phone]
    );
}

module.exports = { getPartnerByUserId, updatePartnerInfo, addPartnerEmail, addPartnerPhone };
