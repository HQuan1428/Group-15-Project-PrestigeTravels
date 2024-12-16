const { db } = require('../../Connect_Server/db');
const checkAccountExists = async (email) => { 
    try {
        const result = await db.oneOrNone('SELECT * FROM "users" WHERE "email" = $1', [email])
        return result? true : false;
    } catch (e) {
        throw e;
    }
}
async function getUserByEmail(Email) {
    const res = await db.query('SELECT * FROM "users" WHERE "email" = $1', [Email]);
    return res[0];
}

async function getUserById(id) {
    const res = await db.query('SELECT * FROM "users" WHERE "id" = $1', [id]);
    return res[0];
}
const addUser = async (userType,fullName, email,phone, hashedPassword) => { 
    try {
        await db.none('INSERT INTO "users" ("fullname", "email","phone","password","role") VALUES ($1, $2,$3,$4,$5)',
            [fullName, email, phone, hashedPassword, userType])
        console.log('Thêm tài khoản thành công!');
    } catch (e) {
        throw e;
    }

}
// Kiểm tra tài khoản và mật khẩu
const checkLogin = async (email, password) => {
    // Kiểm tra xem email và password có giá trị không
    if (!email || !password) {
        throw new Error("Email or password is missing");
    }
    try {
        const user = await db.oneOrNone(
            `SELECT * FROM "users" WHERE "email" = $1 AND "password" = $2`, [email, password]
        );
        return user; // Nếu có, trả về thông tin user, nếu không trả về null
    } catch (e) {
        console.error('Lỗi khi kiểm tra đăng nhập:', e);
        throw e;
    }
};


module.exports = {getUserByEmail,getUserById,checkAccountExists,addUser,checkLogin };
