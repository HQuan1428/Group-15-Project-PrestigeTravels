const { db } = require('../Connect_Server/db');

// Lấy thông tin nhà cung cấp
async function getPartnerByUserId(userId) {
    return db.oneOrNone('SELECT * FROM partners WHERE user_id = $1', [userId]);
}

// Cập nhật thông tin nhà cung cấp
async function updatePartnerInfo(userId, data) {
    const { representativeName, position, businessAddress, bankAccount, bankName } = data;
    return db.none(
        `UPDATE partners 
         SET representative_name = $1, position = $2, business_address = $3, 
             bank_account = $4, bank_name = $5
         WHERE user_id = $6`,
        [representativeName, position, businessAddress, bankAccount, bankName, userId]
    );
}

// Thêm email mới
async function addPartnerEmail(userId, email) {
    return db.none(
        `INSERT INTO partner_emails (partner_id, email) 
         VALUES ((SELECT id FROM partners WHERE user_id = $1), $2)`,
        [userId, email]
    );
}

// Thêm số điện thoại mới
async function addPartnerPhone(userId, phone) {
    return db.none(
        `INSERT INTO partner_phones (partner_id, phone) 
         VALUES ((SELECT id FROM partners WHERE user_id = $1), $2)`,
        [userId, phone]
    );
}

// Lấy danh sách email và số điện thoại của nhà cung cấp
async function getPartnerContacts(userId) {
    const emails = await db.manyOrNone(
        `SELECT email 
         FROM partner_emails 
         WHERE partner_id = (SELECT id FROM partners WHERE user_id = $1)`,
        [userId]
    );

    const phones = await db.manyOrNone(
        `SELECT phone 
         FROM partner_phones 
         WHERE partner_id = (SELECT id FROM partners WHERE user_id = $1)`,
        [userId]
    );

    return {
        emails: emails.map(e => e.email),
        phones: phones.map(p => p.phone)
    };
}

module.exports = { getPartnerByUserId, updatePartnerInfo, addPartnerEmail, addPartnerPhone,getPartnerContacts };
