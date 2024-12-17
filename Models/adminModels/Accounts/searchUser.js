const {db} = require('../../Connect_Server/db'); // Kết nối CSDL

async function getUsersByName(name) {
    const query = `
        SELECT *
        FROM "users" 
        WHERE LOWER("fullname") LIKE LOWER($1)`;
    const values = [`%${name}%`];

    try {
        const result = await db.query(query, values);
        return result;
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error;
    }
}
module.exports = { getUsersByName };
