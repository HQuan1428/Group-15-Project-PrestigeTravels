const { getPartnerByUserId, updatePartnerInfo, addPartnerEmail, addPartnerPhone, getPartnerContacts } = require('../../Models/providerModels/settingsModel');

// Render the settings page
async function renderSettings(req, res) {
    try {
        const partner = await getPartnerByUserId(req.user.id);
        const contacts = await getPartnerContacts(req.user.id);

        if (!partner) {
            return res.status(403).send('Không tìm thấy thông tin nhà cung cấp.');
        }
                const role = req.session.userType;


        res.render('providerViews/partnerSettings', {
            partner,
            emails: contacts.emails,
            phones: contacts.phones,role
        });
    } catch (err) {
        console.error('Error rendering settings page:', err.message);
        res.status(500).send('Lỗi hiển thị trang cài đặt.');
    }
}

// Update company information, including company name
async function updatePersonalInfo(req, res) {
    try {
        const { companyName, representativeName, position, businessAddress, bankAccount, bankName } = req.body;
        await updatePartnerInfo(req.user.id, { companyName, representativeName, position, businessAddress, bankAccount, bankName });
        res.redirect('/partner/settings');
    } catch (err) {
        console.error('Error updating personal info:', err.message);
        res.status(500).send('Lỗi cập nhật thông tin nhà cung cấp.');
    }
}

// Add a new email
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

// Add a new phone number
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
