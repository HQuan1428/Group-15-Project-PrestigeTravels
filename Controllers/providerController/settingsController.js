const { getPartnerByUserId, updatePartnerInfo, addPartnerEmail, addPartnerPhone, getPartnerContacts } = require('../../Models/providerModels/settingsModel');

// Hiển thị giao diện cài đặt
async function renderSettings(req, res) {
    try {
        const partner = await getPartnerByUserId(req.user.id);
        const contacts = await getPartnerContacts(req.user.id); // Lấy danh sách email và số điện thoại

        if (!partner) {
            return res.status(403).send('Không tìm thấy thông tin nhà cung cấp.');
        }

        res.render('providerViews/partnerSettings', {
            partner,
            emails: contacts.emails,   // Danh sách email
            phones: contacts.phones    // Danh sách số điện thoại
        });
    } catch (err) {
        console.error('Error rendering settings page:', err.message);
        res.status(500).send('Lỗi hiển thị trang cài đặt.');
    }
}

// Cập nhật thông tin nhà cung cấp
async function updatePersonalInfo(req, res) {
    try {
        const { representativeName, position, businessAddress, bankAccount, bankName } = req.body;
        await updatePartnerInfo(req.user.id, { representativeName, position, businessAddress, bankAccount, bankName });
        res.redirect('/partner/settings');
    } catch (err) {
        console.error('Error updating personal info:', err.message);
        res.status(500).send('Lỗi cập nhật thông tin nhà cung cấp.');
    }
}

// Thêm email mới
async function addEmail(req, res) {
    try {
        const { email } = req.body;
        await addPartnerEmail(req.user.id, email);
        res.redirect('/partner/settings');
    } catch (err) {
        console.error('Error adding email:', err.message);
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
        console.error('Error adding phone:', err.message);
        res.status(500).send('Lỗi thêm số điện thoại.');
    }
}

module.exports = { renderSettings, updatePersonalInfo, addEmail, addPhone };
