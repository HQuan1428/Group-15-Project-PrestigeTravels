const { db } = require('../Connect_Server/db');

// Get partner details by user ID
async function getPartnerByUserId(userId) {
    return db.oneOrNone('SELECT * FROM partners WHERE user_id = $1', [userId]);
}

// Update partner information
async function updatePartnerInfo(userId, data) {
    const { companyName, representativeName, position, businessAddress, bankAccount, bankName } = data;
    return db.none(
        `UPDATE partners 
         SET company_name = $1, representative_name = $2, position = $3, business_address = $4, 
             bank_account = $5, bank_name = $6
         WHERE user_id = $7`,
        [companyName, representativeName, position, businessAddress, bankAccount, bankName, userId]
    );
}

// Add a new email
async function addPartnerEmail(userId, email) {
    return db.none(
        `INSERT INTO partner_emails (partner_id, email) 
         VALUES ((SELECT id FROM partners WHERE user_id = $1), $2)`,
        [userId, email]
    );
}

// Add a new phone number
async function addPartnerPhone(userId, phone) {
    return db.none(
        `INSERT INTO partner_phones (partner_id, phone) 
         VALUES ((SELECT id FROM partners WHERE user_id = $1), $2)`,
        [userId, phone]
    );
}

// Get partner contacts
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
        emails: emails.map((e) => e.email),
        phones: phones.map((p) => p.phone),
    };
}

module.exports = { getPartnerByUserId, updatePartnerInfo, addPartnerEmail, addPartnerPhone, getPartnerContacts };
