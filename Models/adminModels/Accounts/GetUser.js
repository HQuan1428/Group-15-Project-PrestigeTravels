const {db}=require('../../Connect_Server/db')

async function GetAllUser() {
    try {
        const res = await db.query('SELECT * FROM "users"');
        return res; // Kết quả trả về
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        throw error; // Ném lỗi ra ngoài
    }
}
module.exports={GetAllUser};