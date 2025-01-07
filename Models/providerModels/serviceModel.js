const { db } = require('../../Models/Connect_Server/db');

// Lấy danh sách dịch vụ liên kết với đối tác
const getServicesByPartner = (partnerId) => {
  return db.any(
    `SELECT s.id, s.name, s.description 
     FROM services s 
     JOIN partner_services ps ON s.id = ps.service_id
     WHERE ps.partner_id = $1`,
    [partnerId]
  );
};

// Lấy thông tin dịch vụ theo ID
const getServiceById = (serviceId) => {
  return db.oneOrNone('SELECT * FROM services WHERE id = $1', [serviceId]);
};

// Thêm dịch vụ mới và liên kết với đối tác
const addService = async (partnerId, serviceData) => {
  const { name, description } = serviceData;

  if (!name || !description) {
    throw new Error('Missing required fields: name or description.');
  }

  // Thêm dịch vụ vào bảng `services`
  const newService = await db.one(
    `INSERT INTO services (name, description) VALUES ($1, $2) RETURNING *`,
    [name, description]
  );

  // Liên kết dịch vụ với đối tác trong bảng `partner_services`
  await db.none(
    `INSERT INTO partner_services (partner_id, service_id) VALUES ($1, $2)`,
    [partnerId, newService.id]
  );

  return newService;
};

// Cập nhật dịch vụ
const updateServiceById = (serviceId, serviceData) => {
  const { name, description } = serviceData;
  return db.none(
    'UPDATE services SET name = $1, description = $2 WHERE id = $3',
    [name, description, serviceId]
  );
};

// Xóa dịch vụ (bao gồm cả liên kết với đối tác)
const deleteServiceById = (serviceId) => {
  return db.none('DELETE FROM services WHERE id = $1', [serviceId]);
};

module.exports = {
  getServicesByPartner,
  getServiceById,
  addService,
  updateServiceById,
  deleteServiceById,
};
