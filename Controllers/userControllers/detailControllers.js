const { db } = require('../../Models/Connect_Server/db');
const { DetailApproval } = require('../../Models/adminModels/Approvals/DetailApproval');

const DetailTour = async (req, res) => {
    const { id } = req.params;

    try {
        const detail = await DetailApproval(id);

        // Lấy thêm hình ảnh từ bảng tour_images
        const tourImages = await db.any(
            'SELECT image_url FROM tour_images WHERE tour_id = $1',
            [id]
        );
        detail.tour_images = tourImages;

        // Lấy dịch vụ từ bảng tour_services và services
        const services = await db.any(
            `SELECT s.name 
             FROM tour_services ts 
             JOIN services s ON ts.service_id = s.id 
             WHERE ts.tour_id = $1`,
            [id]
        );
        detail.services = services.map(service => service.name);

        // Lấy lịch trình từ bảng tour_itinerary
        const itinerary = await db.any(
            `SELECT day_number, title, description 
             FROM tour_itinerary 
             WHERE tour_id = $1 
             ORDER BY day_number`,
            [id]
        );
        detail.itinerary = itinerary;

        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        const role = req.session.userType;
        res.render('userViews/detailTour', { detail, role });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi hệ thống');
    }
};


module.exports = { DetailTour };