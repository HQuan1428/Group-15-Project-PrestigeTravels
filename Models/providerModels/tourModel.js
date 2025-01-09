const { db } = require('../../Models/Connect_Server/db');

// Lấy danh sách tour của đối tác
const getToursByPartner = (partnerId) => {
  return db.any(
    `SELECT 
      t.id, 
      t.title, 
      t.price, 
      t.starting_point, 
      (
        SELECT ti.image_url 
        FROM tour_images ti 
        WHERE ti.tour_id = t.id AND ti.is_main = true
        LIMIT 1
      ) AS main_image
     FROM tours t
     WHERE t.partner_id = $1`,
    [partnerId]
  );
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

  // Kiểm tra dữ liệu đầu vào
  if (!title || title.trim() === "") {
    throw new Error("Tiêu đề không được bỏ trống");
  }
  if (!price || isNaN(price)) {
    throw new Error("Giá không hợp lệ");
  }

  return db.none(
    `UPDATE tours
     SET title = $1, description = $2, price = $3, duration = $4, starting_point = $5
     WHERE id = $6`,
    [title, description || null, price, duration || null, starting_point || null, tourId]
  );
};


// Xóa tour
const deleteTourById = (tourId) => {
  return db.none('DELETE FROM tours WHERE id = $1', [tourId]);
};
const getTourDetails = (tourId) => {
  return db.oneOrNone(
    `
    SELECT 
      t.id, 
      t.title, 
      t.description, 
      t.price, 
      t.duration, 
      t.starting_point, 
      t.max_participants,
      t.created_at,
      l.name AS location_name,
      (
        SELECT ti.image_url 
        FROM tour_images ti 
        WHERE ti.tour_id = t.id AND ti.is_main = true
        LIMIT 1
      ) AS main_image,
      (
        SELECT json_agg(image_url) 
        FROM tour_images 
        WHERE tour_id = t.id AND is_main = false
      ) AS sub_images
    FROM tours t
    LEFT JOIN tour_locations tl ON t.id = tl.tour_id
    LEFT JOIN locations l ON tl.location_id = l.id
    WHERE t.id = $1
    `,
    [tourId]
  );
};



module.exports = {
  getToursByPartner,
  getTourById,
  createTour,
  updateTourById,
  deleteTourById,
  getTourDetails,
};
