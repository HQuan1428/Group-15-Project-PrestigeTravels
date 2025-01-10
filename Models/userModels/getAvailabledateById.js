const { db } = require('../Connect_Server/db')
async function getAvailableDates(tour_id) {
    try {
        const res = await db.query(
            `SELECT "available_date"
            FROM "tour_dates"
            WHERE tour_id = $1
            ORDER BY available_date ASC`,
            [tour_id]
        );

        // Kiểm tra và xử lý kết quả trả về
        //console.log('Query Result:', res);  // In ra để kiểm tra

        // Trả về mảng các available_date (đã định dạng)
        return res.map(row => {
            const date = new Date(row.available_date);
            return date.toLocaleDateString('vi-VN'); // Định dạng ngày theo kiểu Việt Nam
        });

    } catch (error) {
        console.error('Lỗi truy vấn lấy available_date:', error);
        throw error;
    }
}



module.exports={getAvailableDates}
