const { db } = require('../Connect_Server/db');

class PromotionModel {
    // Lấy tất cả khuyến mãi của một partner
    static async getAllPromotions(partnerId) {
        try {
            const query = `
                SELECT c.* 
                FROM coupons c
                WHERE c.partner_id = $1
                ORDER BY c.created_at DESC
            `;
            const result = await db.query(query, [partnerId]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    // Thêm khuyến mãi mới
    static async addPromotion(promotionData) {
        try {
            const {
                code,
                title,
                tour_id,
                partner_id,
                discount_percent,
                start_date,
                end_date
            } = promotionData;

            console.log('Received promotion data:', promotionData);
            console.log('Tour ID type:', typeof tour_id);
            console.log('Partner ID type:', typeof partner_id);

            // Kiểm tra tour với pg-promise
            const checkTourQuery = `
                SELECT id, title, partner_id 
                FROM tours 
                WHERE id = $1 AND partner_id = $2
            `;
            
            // Convert partner_id to number if it's a string
            const numericPartnerId = Number(partner_id);
            
            console.log('Executing query with:', {
                tour_id: tour_id,
                partner_id: numericPartnerId
            });

            const tourCheck = await db.oneOrNone(checkTourQuery, [tour_id, numericPartnerId]);
            console.log('Tour check result:', tourCheck);

            if (!tourCheck) {
                // Log thêm thông tin để debug
                const allTours = await db.any('SELECT id, partner_id FROM tours WHERE id = $1', [tour_id]);
                console.log('All matching tours:', allTours);
                throw new Error('Tour không tồn tại hoặc không thuộc về partner này');
            }

            // Tạo ID ngẫu nhiên cho coupon
            const id = 'COUP_' + Math.random().toString(36).substr(2, 9);

            const query = `
                INSERT INTO coupons (
                    id, code, title, tour_id, partner_id,
                    discount_percent, start_date, end_date
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            `;
            
            const values = [
                id,
                code,
                title,
                tour_id,
                numericPartnerId,
                discount_percent,
                start_date,
                end_date
            ];

            console.log('Inserting coupon with values:', values);

            const result = await db.one(query, values);
            return result;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    }

    // Xóa khuyến mãi
    static async deletePromotion(id, partnerId) {
        try {
            const result = await db.result(
                'DELETE FROM coupons WHERE id = $1 AND partner_id = $2',
                [id, partnerId]
            );
            return result.rowCount > 0;
        } catch (error) {
            throw error;
        }
    }

    // Lấy thông tin một khuyến mãi
    static async getPromotionById(id, partnerId) {
        try {
            return await db.oneOrNone(
                'SELECT * FROM coupons WHERE id = $1 AND partner_id = $2',
                [id, partnerId]
            );
        } catch (error) {
            throw error;
        }
    }

    // Cập nhật khuyến mãi
    static async updatePromotion(id, partnerId, updateData) {
        try {
            const {
                code,
                title,
                tour_id,
                discount_percent,
                start_date,
                end_date
            } = updateData;

            const result = await db.oneOrNone(`
                UPDATE coupons 
                SET code = $1, 
                    title = $2,
                    tour_id = $3,
                    discount_percent = $4,
                    start_date = $5,
                    end_date = $6
                WHERE id = $7 AND partner_id = $8
                RETURNING *
            `, [code, title, tour_id, discount_percent, start_date, end_date, id, partnerId]);

            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PromotionModel;