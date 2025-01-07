const { getPartnerByUserId, getToursByPartner } = require('../../Models/providerModels/partnerModels');

// Trang dashboard nhà cung cấp
async function renderPartnerDashboard(req, res) {
    try {
        const userId = req.user.id; // Lấy user_id từ session
        const partner = await getPartnerByUserId(userId);

        if (!partner) {
            return res.status(403).send('Bạn không phải nhà cung cấp.');
        }

        // Lưu partner_id vào session để sử dụng trong các route khác
        req.session.partner_id = partner.id;

        const tours = await getToursByPartner(partner.id);
        res.render('providerViews/partnerDashboard', { partner, tours });
    } catch (err) {
        console.error('Error rendering dashboard:', err);
        res.status(500).send('Lỗi hiển thị dashboard.');
    }
}

module.exports = {
    renderPartnerDashboard,
};
