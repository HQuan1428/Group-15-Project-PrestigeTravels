const { getPartnerByUserId, updatePartnerInfo, addPartnerEmail, addPartnerPhone } = require('../../Models/providerModels/settingsModel');

// Hiển thị giao diện cài đặt
async function renderSettings(req, res) {
    console.log('Accessing /partner/settings'); // Log này phải xuất hiện
    try {
        const partner = await getPartnerByUserId(req.user.id);
        if (!partner) {
            return res.status(403).send('Không tìm thấy thông tin nhà cung cấp.');
        }
        res.render('providerViews/partnerSettings', { partner });
    } catch (err) {
        console.error('Error rendering settings page:', err);
        res.status(500).send('Lỗi hiển thị trang cài đặt.');
    }
}


// Cập nhật thông tin cá nhân
async function updatePersonalInfo(req, res) {
    try {
        const { fullName, gender, dob, location } = req.body;
        await updatePartnerInfo(req.user.id, { fullName, gender, dob, location });
        res.redirect('/partner/settings');
    } catch (err) {
        console.error('Error updating personal info:', err);
        res.status(500).send('Lỗi cập nhật thông tin cá nhân.');
    }
}

// Thêm email mới
async function addEmail(req, res) {
    try {
        const { email } = req.body;
        await addPartnerEmail(req.user.id, email);
        res.redirect('/partner/settings');
    } catch (err) {
        console.error('Error adding email:', err);
        res.status(500).send('Lỗi thêm email.');
    }
}

// Thêm số điện thoại mới
async function addPhone(req, res) {
    try {
        const { phone } = req.body;
        await addPartnerPhone(req.user.id, phone);
        res.redirect('/partner/settings');
    } catch (err) {
        console.error('Error adding phone:', err);
        res.status(500).send('Lỗi thêm số điện thoại.');
    }
}

module.exports = { renderSettings, updatePersonalInfo, addEmail, addPhone };
