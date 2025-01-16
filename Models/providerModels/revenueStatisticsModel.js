const { db } = require('../Connect_Server/db');

// Lấy doanh thu theo ngày
const getRevenueByDate = async (partnerId, fromDate, toDate, serviceCode) => {
    try {
        console.log('Query params:', { partnerId, fromDate, toDate, serviceCode });
        
        const result = await db.any(`
            SELECT 
                b.tour_id as service_code,
                t.title as tour_name,
                b.total_price as total_revenue,
                b.created_at::date as from_date,
                b.created_at::date as to_date
            FROM bookings b
            JOIN tours t ON b.tour_id = t.id
            WHERE t.partner_id = $1 
            AND b.status = 'confirmed'
            AND ($2::date IS NULL OR b.created_at::date >= $2::date)
            AND ($3::date IS NULL OR b.created_at::date <= $3::date)
            AND ($4::text IS NULL OR b.tour_id = $4)
            ORDER BY b.created_at DESC
        `, [partnerId, fromDate, toDate, serviceCode]);
        
        console.log('Query result:', result);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Lấy doanh thu theo tháng
const getRevenueByMonth = async (partnerId, year) => {
    return db.any(
        `SELECT month, SUM(revenue) AS total_revenue
         FROM revenue_statistics
         WHERE partner_id = $1 AND year = $2
         GROUP BY month
         ORDER BY month`,
        [partnerId, year]
    );
};

// Lấy doanh thu theo năm
const getRevenueByYear = async (partnerId) => {
    return db.any(
        `SELECT year, SUM(revenue) AS total_revenue
         FROM revenue_statistics
         WHERE partner_id = $1
         GROUP BY year
         ORDER BY year`,
        [partnerId]
    );
};

module.exports = {
    getRevenueByDate,
    getRevenueByMonth,
    getRevenueByYear,
};
