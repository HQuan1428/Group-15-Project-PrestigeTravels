const PromotionModel = require('../../Models/providerModels/promotionModel');
const { db } = require('../../Models/Connect_Server/db');

class PromotionsController {
    // Hiển thị trang khuyến mãi
    static async renderPromotions(req, res) {
        try {
            const userId = req.user.id;
            
            // Lấy partner_id
            const partnerResult = await db.one(
                'SELECT id FROM partners WHERE user_id = $1',
                [userId]
            );
            const partnerId = partnerResult.id;
            
            // Lấy danh sách khuyến mãi với thông tin tour
            const query = `
                SELECT c.*, t.title as tour_name
                FROM coupons c
                LEFT JOIN tours t ON c.tour_id = t.id
                WHERE c.partner_id = $1
                ORDER BY c.created_at DESC
            `;
            
            const promotions = await db.any(query, [partnerId]);
            console.log('Loaded promotions:', promotions);
            const role = req.session.userType;

            res.render('providerViews/promotions', {
                promotions,
                title: 'Quản lý khuyến mãi',
                role
            });
        } catch (error) {
            console.error('Detailed error:', error);
            res.status(500).send('Internal Server Error: ' + error.message);
        }
    }

    // Thêm khuyến mãi mới
    static async addPromotion(req, res) {
        try {
            const userId = req.user.id;
            console.log('User ID:', userId);

            // Lấy partner_id
            const partnerResult = await db.one(
                'SELECT id FROM partners WHERE user_id = $1',
                [userId]
            );
            
            const partnerId = partnerResult.id;
            console.log('Partner ID:', partnerId);
            
            // Log toàn bộ dữ liệu gửi lên
            console.log('Request body:', req.body);
            
            const promotionData = {
                ...req.body,
                partner_id: partnerId,
                tour_id: req.body.tour_id.trim() // Đảm bảo không có khoảng trắng
            };
            
            console.log('Final promotion data:', promotionData);

            const newPromotion = await PromotionModel.addPromotion(promotionData);
            
            res.json({
                success: true,
                message: 'Thêm khuyến mãi thành công',
                data: newPromotion
            });
        } catch (error) {
            console.error('Detailed error:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra khi thêm khuyến mãi: ' + error.message
            });
        }
    }

    // Xóa khuyến mãi
    static async deletePromotion(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            
            const partnerResult = await db.one(
                'SELECT id FROM partners WHERE user_id = $1',
                [userId]
            );
            const partnerId = partnerResult.id;

            const result = await PromotionModel.deletePromotion(id, partnerId);
            
            if (result) {
                res.json({ success: true, message: 'Xóa khuyến mãi thành công' });
            } else {
                res.status(404).json({ success: false, message: 'Không tìm thấy khuyến mãi' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi xóa khuyến mãi' });
        }
    }

    // Lấy thông tin khuyến mãi để sửa
    static async getPromotionById(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            
            const partnerResult = await db.one(
                'SELECT id FROM partners WHERE user_id = $1',
                [userId]
            );
            const partnerId = partnerResult.id;

            const promotion = await PromotionModel.getPromotionById(id, partnerId);
            
            if (promotion) {
                res.json({ success: true, data: promotion });
            } else {
                res.status(404).json({ success: false, message: 'Không tìm thấy khuyến mãi' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi lấy thông tin khuyến mãi' });
        }
    }

    // Cập nhật khuyến mãi
    static async updatePromotion(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            
            const partnerResult = await db.one(
                'SELECT id FROM partners WHERE user_id = $1',
                [userId]
            );
            const partnerId = partnerResult.id;

            const updatedPromotion = await PromotionModel.updatePromotion(id, partnerId, req.body);
            
            if (updatedPromotion) {
                res.json({
                    success: true,
                    message: 'Cập nhật khuyến mãi thành công',
                    data: updatedPromotion
                });
            } else {
                res.status(404).json({ success: false, message: 'Không tìm thấy khuyến mãi' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi cập nhật khuyến mãi' });
        }
    }
}

module.exports = PromotionsController;