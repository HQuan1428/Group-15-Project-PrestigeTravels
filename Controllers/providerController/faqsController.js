const { getFAQs, addFAQ, updateFAQ, deleteFAQ } = require('../../Models/providerModels/faqsModel');

// Lấy danh sách FAQs
async function renderFAQs(req, res) {
    try {
        const partnerId = req.session.partner_id;
        const faqs = await getFAQs(partnerId);
        res.render('providerViews/faqs', { faqs });
    } catch (error) {
        console.error('Error fetching FAQs:', error.message);
        res.status(500).send('Lỗi lấy danh sách FAQs.');
    }
}

// Thêm FAQ mới
async function createFAQ(req, res) {
    try {
        const partnerId = req.session.partner_id;
        const { question, answer } = req.body;

        await addFAQ(partnerId, question, answer);
        res.redirect('/partner/support');
    } catch (error) {
        console.error('Error creating FAQ:', error.message);
        res.status(500).send('Lỗi thêm FAQ.');
    }
}

// Cập nhật FAQ
async function editFAQ(req, res) {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        await updateFAQ(id, question, answer);
        res.redirect('/partner/support');
    } catch (error) {
        console.error('Error updating FAQ:', error.message);
        res.status(500).send('Lỗi cập nhật FAQ.');
    }
}

// Xóa FAQ
async function removeFAQ(req, res) {
    try {
        const { id } = req.params;

        await deleteFAQ(id);
        res.redirect('/partner/support');
    } catch (error) {
        console.error('Error deleting FAQ:', error.message);
        res.status(500).send('Lỗi xóa FAQ.');
    }
}

module.exports = { renderFAQs, createFAQ, editFAQ, removeFAQ };
