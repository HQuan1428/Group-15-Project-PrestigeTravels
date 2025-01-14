const { db } = require('../../Connect_Server/db');

async function addNotification(userId, { title, content, type }) {
    return db.none(
        `INSERT INTO notifications (user_id, title, content, type, is_read, created_at)
         VALUES ($1, $2, $3, $4, FALSE, CURRENT_TIMESTAMP)`,
        [userId, title, content, type]
    );
}

async function getNotifications(userId) {
    return db.manyOrNone(
        `SELECT * FROM notifications
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [userId]
    );
}

async function markNotificationAsRead(notificationId, userId) {
    return db.none(
        `UPDATE notifications
         SET is_read = TRUE
         WHERE id = $1 AND user_id = $2`,
        [notificationId, userId]
    );
}

module.exports = { addNotification, getNotifications, markNotificationAsRead };
