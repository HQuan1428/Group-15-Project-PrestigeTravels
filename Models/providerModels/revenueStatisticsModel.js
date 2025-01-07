const { db } = require('../Connect_Server/db');

// Lấy doanh thu theo ngày
const getRevenueByDate = async (partnerId, fromDate, toDate, serviceCode) => {
    try {
        const result = await db.any(`
            SELECT 
                rs.year,
                rs.month,
                rs.day,
                rs.revenue as total_revenue,
                t.id as service_code,
                to_date(rs.year || '-' || rs.month || '-' || rs.day, 'YYYY-MM-DD') as from_date,
                to_date(rs.year || '-' || rs.month || '-' || rs.day, 'YYYY-MM-DD') as to_date
            FROM revenue_statistics rs
            LEFT JOIN tours t ON t.partner_id = rs.partner_id
            WHERE rs.partner_id = $1 
            AND ($2::date is null OR to_date(rs.year || '-' || rs.month || '-' || rs.day, 'YYYY-MM-DD') >= $2)
            AND ($3::date is null OR to_date(rs.year || '-' || rs.month || '-' || rs.day, 'YYYY-MM-DD') <= $3)
            AND ($4::text is null OR t.id = $4)
            ORDER BY rs.year, rs.month, rs.day
        `, [partnerId, fromDate, toDate, serviceCode]);
        
        console.log('Query result:', result); // Debug log
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
