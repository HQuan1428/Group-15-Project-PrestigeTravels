const { getRevenueByDate, getRevenueByMonth, getRevenueByYear } = require('../../Models/providerModels/revenueStatisticsModel');

// Lấy doanh thu theo ngày
const getDailyRevenue = async (req, res) => {
    try {
        const { partnerId, year, month } = req.query;
        const revenue = await getRevenueByDate(partnerId, year, month);
        res.status(200).json({ success: true, data: revenue });
    } catch (error) {
        console.error('Error fetching daily revenue:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy doanh thu theo ngày.' });
    }
};

// Lấy doanh thu theo tháng
const getMonthlyRevenue = async (req, res) => {
    try {
        const { partnerId, year } = req.query;
        const revenue = await getRevenueByMonth(partnerId, year);
        res.status(200).json({ success: true, data: revenue });
    } catch (error) {
        console.error('Error fetching monthly revenue:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy doanh thu theo tháng.' });
    }
};

// Lấy doanh thu theo năm
const getYearlyRevenue = async (req, res) => {
    try {
        const { partnerId } = req.query;
        const revenue = await getRevenueByYear(partnerId);
        res.status(200).json({ success: true, data: revenue });
    } catch (error) {
        console.error('Error fetching yearly revenue:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy doanh thu theo năm.' });
    }
};

module.exports = {
    getDailyRevenue,
    getMonthlyRevenue,
    getYearlyRevenue,
};
