const { db } = require('../../Models/Connect_Server/db');

// Lấy danh sách đơn hàng của nhà cung cấp
const getOrdersByPartner = (partnerId) => {
    return db.any(`
        SELECT b.id AS order_id, u.fullname AS customer_name, b.status, b.created_at AS order_date, t.title AS tour_name
        FROM bookings b
        JOIN tours t ON b.tour_id = t.id
        JOIN users u ON b.user_id = u.id
        WHERE t.partner_id = $1
        ORDER BY b.created_at DESC
    `, [partnerId]);
};

// Lấy chi tiết đơn hàng
const getOrderDetails = (orderId) => {
    return db.oneOrNone(`
        SELECT b.id AS order_id, u.fullname AS customer_name, b.total_price, b.status, 
               b.created_at AS order_date, t.title AS tour_name, b.payment_method, b.adults, b.children
        FROM bookings b
        JOIN tours t ON b.tour_id = t.id
        JOIN users u ON b.user_id = u.id
        WHERE b.id = $1
    `, [orderId]);
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = (orderId, status) => {
    return db.none('UPDATE bookings SET status = $1 WHERE id = $2', [status, orderId]);
};

module.exports = {
    getOrdersByPartner,
    getOrderDetails,
    updateOrderStatus,
};
