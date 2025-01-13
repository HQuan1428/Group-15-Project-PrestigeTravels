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

        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        
        const role = req.session.userType;
        res.render('userViews/detailTour', { detail: detail, role });

    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi hệ thống');
    }
}

module.exports = { DetailTour };