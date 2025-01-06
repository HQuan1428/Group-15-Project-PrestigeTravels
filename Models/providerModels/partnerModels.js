const { db } = require('../Connect_Server/db');
// Thêm đối tác mới vào bảng `partners`
async function addPartner(userId, fullName, phone) {
    const query = `
      INSERT INTO partners (user_id, company_name, tax_code, business_address, representative_name, position, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING *;
    `;
  
    const values = [
      userId,
      `Công ty của ${fullName}`, // Tên công ty mặc định
      `TAX${Math.floor(Math.random() * 100000)}`, // Mã số thuế giả
      `Địa chỉ của ${fullName}`, // Địa chỉ mặc định
      fullName,
      'Chưa xác định', // Vị trí mặc định
    ];
  
    return db.one(query, values);
  }
// Lấy thông tin nhà cung cấp
async function getPartnerByUserId(userId) {
    return db.oneOrNone('SELECT * FROM partners WHERE user_id = $1', [userId]);
  }
  

// Lấy danh sách tour của nhà cung cấp
async function getToursByPartner(partnerId) {
    return db.any('SELECT * FROM tours WHERE partner_id = $1 ORDER BY created_at DESC', [partnerId]);
}

// Tạo tour mới
async function createTour(partnerId, tourData) {
    const { title, description, price, duration, starting_point, max_participants } = tourData;
    return db.one(
        `INSERT INTO tours (partner_id, title, description, price, duration, starting_point, max_participants)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [partnerId, title, description, price, duration, starting_point, max_participants]
    );
}

// Cập nhật thông tin tour
async function updateTour(tourId, tourData) {
    const { title, description, price, duration, starting_point, max_participants } = tourData;
    return db.none(
        `UPDATE tours
         SET title = $1, description = $2, price = $3, duration = $4, starting_point = $5, max_participants = $6
         WHERE id = $7`,
        [title, description, price, duration, starting_point, max_participants, tourId]
    );
}

module.exports = {
    addPartner,
    getPartnerByUserId,
    getToursByPartner,
    createTour,
    updateTour,
};
