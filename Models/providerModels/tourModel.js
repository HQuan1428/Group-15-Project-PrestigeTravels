const { db } = require('../../Models/Connect_Server/db');

// Lấy danh sách tour của đối tác
const getToursByPartner = (partnerId) => {
  return db.any('SELECT * FROM tours WHERE partner_id = $1', [partnerId]);
};

// Lấy thông tin tour theo ID
const getTourById = (tourId) => {
  return db.oneOrNone('SELECT * FROM tours WHERE id = $1', [tourId]);
};

// Thêm tour mới
const createTour = (partnerId, tourData) => {
    const { title, description, price, duration, starting_point } = tourData;
    const id = `TOUR-${Date.now()}`; // Tạo ID tự động

    if (!partnerId) {
        throw new Error('Partner ID không hợp lệ.');
    }

    return db.one(
        `INSERT INTO tours (id, partner_id, title, description, price, duration, starting_point)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [id, partnerId, title, description, price, duration, starting_point]
    );
};


// Cập nhật tour
const updateTourById = (tourId, tourData) => {
  const { title, description, price, duration, starting_point } = tourData;
  return db.none(
    `UPDATE tours
     SET title = $1, description = $2, price = $3, duration = $4, starting_point = $5
     WHERE id = $6`,
    [title, description, price, duration, starting_point, tourId]
  );
};

// Xóa tour
const deleteTourById = (tourId) => {
  return db.none('DELETE FROM tours WHERE id = $1', [tourId]);
};

module.exports = {
  getToursByPartner,
  getTourById,
  createTour,
  updateTourById,
  deleteTourById,
};
