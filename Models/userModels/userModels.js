const { db } = require('../../Models/Connect_Server/db')

async function GetLocation() {
    try {
        // Truy vấn để lấy tất cả các địa điểm
        const locationResult = await db.query('SELECT * FROM "locations"');
        //console.log(locationResult);
        // Lấy danh sách các địa điểm từ kết quả truy vấn
        const locations = locationResult;

        // Lặp qua từng địa điểm để lấy các tour tương ứng
        for (let location of locations) {
            // Truy vấn để lấy các tour tương ứng với mỗi địa điểm
            const tourResult = await db.query(
                `SELECT t.* 
                 FROM "tours" t
                 JOIN "tour_locations" tl ON t.id = tl.tour_id
                 WHERE tl.location_id = $1`, 
                [location.id]
            );
            
            // Gắn thông tin các tour vào đối tượng location
            location.tours = tourResult;
        }
       // console.log(locations)

        // Trả về danh sách các địa điểm và tour của chúng
        return locations;
    } catch (error) {
        console.error('Error executing query', error.stack);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}



module.exports={GetLocation}